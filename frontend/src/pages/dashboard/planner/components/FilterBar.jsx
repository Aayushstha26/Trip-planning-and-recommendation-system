import { Search, X } from "lucide-react";

const FILTER_TABS = (stats) => [
  { id: "all", label: "All Trips", count: stats.total },
  { id: "organizing", label: "Organizing", count: stats.organizing },
  { id: "joined", label: "Joined", count: stats.joined },
  { id: "upcoming", label: "Upcoming Departures" },
  {
    id: "planning",
    label: "Destination Pending",
    count: stats.total - stats.withDestination,
  },
];

export function FilterBar({ stats, activeFilter, onFilterChange, searchQuery, onSearchChange }) {
  const tabs = FILTER_TABS(stats);

  return (
    <div className="mt-8 space-y-4">
      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive ? "shadow-xs" : "opacity-75 hover:opacity-100"
              }`}
              style={{
                backgroundColor: isActive
                  ? "var(--theme-btn-bg, #c8ff00)"
                  : "var(--theme-elevated)",
                color: isActive
                  ? "var(--theme-btn-text, #06110d)"
                  : "var(--theme-text-main)",
              }}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-extrabold ${
                    isActive
                      ? "bg-black/15 text-current"
                      : "bg-black/5 dark:bg-white/10"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Box */}
      <div className="pt-1">
        <div className="relative max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by trip, destination, region, code..."
            className="w-full border rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm font-medium focus:outline-none transition-colors"
            style={{
              backgroundColor: "var(--theme-surface-solid)",
              borderColor: "var(--theme-border-subtle)",
              color: "var(--theme-text-main)",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
