import { Link } from "react-router-dom";
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Banknote,
  Users,
  Copy,
  Check,
  ArrowRight,
  Trash2,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function getTripStatus(startDate, endDate) {
  if (!startDate) return { label: "Dates Flexible", variant: "neutral" };

  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;

  now.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  if (now > end) return { label: "Past Trip", variant: "past" };
  if (now >= start && now <= end) return { label: "Happening Now", variant: "active" };

  const diffDays = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return { label: "Departs Tomorrow", variant: "soon" };
  return { label: `In ${diffDays} days`, variant: "upcoming" };
}

export function formatDateRange(startDate, endDate) {
  if (!startDate) return "Dates Flexible";
  const start = new Date(startDate);
  const opts = { month: "short", day: "numeric", year: "numeric" };
  if (!endDate) return start.toLocaleDateString("en-US", opts);
  const end = new Date(endDate);
  if (start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} to ${end.toLocaleDateString("en-US", opts)}`;
  }
  return `${start.toLocaleDateString("en-US", opts)} to ${end.toLocaleDateString("en-US", opts)}`;
}

export function TripCard({ group, currentUser, copiedId, onCopy, onDelete, onLeave }) {
  const isOwner = currentUser?.id && group.ownerId === currentUser.id;
  const memberCount = group._count?.members || group.members?.length || 1;
  const status = getTripStatus(group.startDate, group.endDate);
  const destination = group.destination;

  return (
    <div
      className="rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-md group relative"
      style={{
        backgroundColor: "var(--theme-surface-solid)",
        borderColor: "var(--theme-border)",
        boxShadow: "var(--theme-card-shadow)",
      }}
    >
      {/* Banner / Cover Area */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        {destination?.imageUrl ? (
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center relative p-6 text-center select-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(6,17,13,0.92) 0%, rgba(20,40,33,0.95) 100%)",
            }}
          >
            <Compass className="w-10 h-10 opacity-25 mb-1 text-emerald-400" />
            <span className="text-xs font-bold tracking-wide uppercase opacity-60 text-slate-300">
              Destination Decision in Progress
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span
            className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md shadow-xs border"
            style={{
              backgroundColor: isOwner
                ? "rgba(200, 255, 0, 0.9)"
                : "rgba(255, 255, 255, 0.85)",
              color: "#06110d",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            {isOwner ? "Organizer" : "Traveler"}
          </span>

          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border ${
              status.variant === "active"
                ? "bg-emerald-500/90 text-white border-emerald-400/30"
                : status.variant === "soon"
                  ? "bg-amber-500/90 text-white border-amber-400/30"
                  : status.variant === "past"
                    ? "bg-slate-700/80 text-slate-300 border-slate-600/30"
                    : "bg-black/60 text-white border-white/20"
            }`}
          >
            {status.label}
          </span>
        </div>

        {/* Destination Bottom Info on Cover */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between">
          <div>
            {destination ? (
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                <MapPin className="h-3 w-3 text-emerald-400" />
                <span>{destination.name}</span>
                {destination.region && (
                  <span className="opacity-75 font-normal">
                    ({destination.region})
                  </span>
                )}
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                <Sparkles className="h-3 w-3 text-amber-300" />
                <span>Preferences Gathering</span>
              </div>
            )}
          </div>

          {destination?.difficulty && (
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white border border-white/10">
              {destination.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Trip Title */}
          <Link
            to={`/dashboard/planner/${group.id}`}
            className="text-lg font-bold tracking-tight hover:underline line-clamp-1 block transition-colors"
            style={{ color: "var(--theme-text-main)" }}
          >
            {group.name}
          </Link>

          {/* Date & Duration */}
          <div
            className="mt-2.5 flex items-center gap-2 text-xs font-semibold"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{formatDateRange(group.startDate, group.endDate)}</span>
          </div>

          {/* Destination Highlights (if selected) */}
          {destination && (
            <div
              className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-medium pt-2 border-t"
              style={{ borderColor: "var(--theme-border-subtle)" }}
            >
              <div
                className="flex items-center gap-1.5"
                style={{ color: "var(--theme-text-muted)" }}
              >
                <Clock className="w-3.5 h-3.5 opacity-60" />
                <span>{destination.durationDays} Days Duration</span>
              </div>
              {destination.estimatedBudget && (
                <div
                  className="flex items-center gap-1.5"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  <Banknote className="w-3.5 h-3.5 opacity-60" />
                  <span>~NPR {destination.estimatedBudget.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}

          {/* Members & Invite Code Row */}
          <div
            className="mt-4 pt-3 border-t flex items-center justify-between gap-2"
            style={{ borderColor: "var(--theme-border-subtle)" }}
          >
            <div
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "var(--theme-text-muted)" }}
            >
              <Users className="h-3.5 w-3.5" />
              <span>
                {memberCount} {memberCount === 1 ? "Traveler" : "Travelers"}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => onCopy(e, group.inviteCode, group.id)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              style={{
                backgroundColor: "var(--theme-elevated)",
                borderColor: "var(--theme-border-subtle)",
                color: "var(--theme-text-main)",
              }}
              title="Copy Invite Code"
            >
              <span>{group.inviteCode}</span>
              {copiedId === group.id ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3 opacity-60" />
              )}
            </button>
          </div>
        </div>

        {/* Card Actions Footer */}
        <div
          className="mt-5 pt-3 border-t flex items-center gap-2"
          style={{ borderColor: "var(--theme-border-subtle)" }}
        >
          <Button
            asChild
            className="flex-1 rounded-xl font-bold text-xs justify-between cursor-pointer transition-all hover:brightness-95 active:scale-95"
            style={{
              backgroundColor: "var(--theme-btn-bg, #c8ff00)",
              color: "var(--theme-btn-text, #06110d)",
            }}
          >
            <Link to={`/dashboard/planner/${group.id}`}>
              <span>Open Trip Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          {isOwner ? (
            <button
              type="button"
              onClick={() => onDelete(group)}
              className="p-2.5 rounded-xl border transition-colors hover:bg-red-500/10 hover:text-red-500 cursor-pointer text-slate-400"
              style={{ borderColor: "var(--theme-border-subtle)" }}
              title="Delete trip group"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onLeave(group)}
              className="p-2.5 rounded-xl border transition-colors hover:bg-red-500/10 hover:text-red-500 cursor-pointer text-slate-400"
              style={{ borderColor: "var(--theme-border-subtle)" }}
              title="Leave this trip"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
