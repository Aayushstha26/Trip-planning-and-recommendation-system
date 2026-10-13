import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Calendar,
  Users,
  Copy,
  Check,
  MapPin,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const TripCard = ({ group, currentUser }) => {
  const [copied, setCopied] = useState(false);

  const isOwner = currentUser?.id && group.ownerId === currentUser.id;
  const memberCount = group._count?.members || group.members?.length || 1;

  const handleCopyCode = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (group?.inviteCode) {
      navigator.clipboard.writeText(group.inviteCode);
      setCopied(true);
      toast.success("invite code copied to clipboard");

      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="rounded-3xl border p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-md group"
      style={{
        backgroundColor: "var(--theme-surface-solid)",
        borderColor: "var(--theme-border)",
        boxShadow: "var(--theme-card-shadow)",
      }}
    >
      <div>
        {/* Header Tags: Role & Destination */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border"
            style={{
              backgroundColor: isOwner
                ? "var(--theme-elevated)"
                : "var(--theme-surface)",
              borderColor: isOwner
                ? "var(--theme-border-highlight)"
                : "var(--theme-border-subtle)",
              color: "var(--theme-text-main)",
            }}
          >
            {isOwner ? "👑 Owner" : "👥 Member"}
          </span>

          {group.destination ? (
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg"
              style={{
                backgroundColor: "var(--theme-elevated)",
                color: "var(--theme-text-main)",
              }}
            >
              <MapPin
                className="h-3.5 w-3.5"
                style={{ color: "var(--theme-border-highlight)" }}
              />
              {group.destination.name}
            </span>
          ) : (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-lg opacity-70"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Destination TBD
            </span>
          )}
        </div>

        {/* Group Name */}
        <h3
          className="text-xl font-bold tracking-tight group-hover:underline line-clamp-1"
          style={{ color: "var(--theme-text-main)" }}
        >
          {group.name}
        </h3>

        {/* Travel Dates */}
        <div
          className="mt-3 flex items-center gap-2 text-xs font-semibold"
          style={{ color: "var(--theme-text-muted)" }}
        >
          <Calendar className="h-3.5 w-3.5" />
          {group.startDate ? (
            <span>
              {new Date(group.startDate).toLocaleDateString()}
              {group.endDate &&
                ` – ${new Date(group.endDate).toLocaleDateString()}`}
            </span>
          ) : (
            <span>Dates flexible</span>
          )}
        </div>

        {/* Member Count */}
        <div
          className="mt-2 flex items-center gap-2 text-xs font-semibold"
          style={{ color: "var(--theme-text-muted)" }}
        >
          <Users className="h-3.5 w-3.5" />
          <span>
            {memberCount} {memberCount === 1 ? "traveler" : "travelers"}
          </span>
        </div>

        {/* Invite Code Quick Copy */}
        <div
          className="mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs"
          style={{
            backgroundColor: "var(--theme-elevated)",
            borderColor: "var(--theme-border-subtle)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <KeyRound className="h-3.5 w-3.5 opacity-60" />
            <span
              className="font-mono font-bold tracking-wider"
              style={{ color: "var(--theme-text-main)" }}
            >
              {group.inviteCode}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="cursor-pointer p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Copy Invite Code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 opacity-70" />
            )}
          </button>
        </div>
      </div>

      {/* Card Action Link */}
      <div
        className="mt-6 pt-4 border-t"
        style={{ borderColor: "var(--theme-border-subtle)" }}
      >
        <Button
          asChild
          className="w-full rounded-xl font-bold text-xs justify-between cursor-pointer transition-all hover:brightness-95 active:scale-95"
          style={{
            backgroundColor: "var(--theme-btn-bg, #c8ff00)",
            color: "var(--theme-btn-text, #06110d)",
          }}
        >
          <Link to={`/planner/${group.id}`}>
            <span>View Trip & Members</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TripCard;
