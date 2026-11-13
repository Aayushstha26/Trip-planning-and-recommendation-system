import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const inputSx = {
  backgroundColor: "var(--theme-elevated)",
  borderColor: "var(--theme-border)",
  color: "var(--theme-text-main)",
};

export function DestinationFilters({ search, onSearchChange, difficulty, onDifficultyChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "var(--theme-text-muted)" }}
        />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10 rounded-xl text-sm"
          style={inputSx}
        />
      </div>
      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="px-4 h-10 rounded-xl border text-sm outline-none cursor-pointer"
        style={inputSx}
      >
        <option value="">All Difficulties</option>
        <option value="EASY">Easy</option>
        <option value="MODERATE">Moderate</option>
        <option value="HARD">Hard</option>
      </select>
    </div>
  );
}

