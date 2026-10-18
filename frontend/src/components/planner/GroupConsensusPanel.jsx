import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const GroupConsensusPanel = ({ group }) => {
  const [expandedMemberId, setExpandedMemberId] = useState(null);

  const members = group?.members || [];

  const toggleExpand = (id) => {
    setExpandedMemberId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="rounded-3xl border shadow-sm overflow-hidden"
      style={{ backgroundColor: "var(--theme-surface-solid)", borderColor: "var(--theme-border)" }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 border-b flex items-center justify-between"
        style={{ borderColor: "var(--theme-border-subtle)" }}
      >
        <div>
          <h4 className="text-base font-black" style={{ color: "var(--theme-text-main)" }}>
            Group Preferences
          </h4>
          <p className="text-xs mt-0.5" style={{ color: "var(--theme-text-muted)" }}>
            Click a traveler to view their submitted preferences.
          </p>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-xl"
          style={{ backgroundColor: "var(--theme-elevated)", color: "var(--theme-text-main)" }}
        >
          {members.filter((m) => Boolean(m.preference)).length} / {members.length} ready
        </span>
      </div>

      {/* Member List */}
      <div className="p-4 space-y-2">
        {members.map((member) => {
          const user = member.user || {};
          const pref = member.preference;
          const isExpanded = expandedMemberId === member.id;

          return (
            <div
              key={member.id}
              className="rounded-2xl border transition-all overflow-hidden"
              style={{
                backgroundColor: "var(--theme-elevated)",
                borderColor: isExpanded ? "var(--theme-border-highlight)" : "var(--theme-border-subtle)",
              }}
            >
              <button
                type="button"
                onClick={() => pref && toggleExpand(member.id)}
                disabled={!pref}
                className={`w-full p-3.5 flex items-center justify-between text-left ${
                  pref ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                    style={{ backgroundColor: "var(--theme-surface)", color: "var(--theme-text-main)" }}
                  >
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate" style={{ color: "var(--theme-text-main)" }}>
                        {user.name || "Member"}
                      </span>
                      <span
                        className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: member.role === "OWNER" ? "var(--theme-border-highlight)" : "var(--theme-surface)",
                          color: member.role === "OWNER" ? "#06110d" : "var(--theme-text-muted)",
                        }}
                      >
                        {member.role}
                      </span>
                    </div>
                    <span className="text-[10px] block truncate" style={{ color: "var(--theme-text-muted)" }}>
                      {user.email}
                    </span>
                  </div>
                </div>

                {/* Status / Summary */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {pref ? (
                    <>
                      <span className="text-[11px] font-bold text-emerald-500">
                        NPR {(pref.budget / 1000).toFixed(0)}k · {pref.difficulty}
                      </span>
                      {isExpanded
                        ? <ChevronUp className="h-3.5 w-3.5" style={{ color: "var(--theme-text-muted)" }} />
                        : <ChevronDown className="h-3.5 w-3.5" style={{ color: "var(--theme-text-muted)" }} />
                      }
                    </>
                  ) : (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: "var(--theme-surface)", color: "var(--theme-text-muted)" }}
                    >
                      Pending
                    </span>
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && pref && (
                <div
                  className="px-4 pb-4 pt-2 border-t space-y-2.5 animate-in fade-in duration-150"
                  style={{ borderColor: "var(--theme-border-subtle)" }}
                >
                  <div className="flex flex-wrap gap-3 text-[11px]" style={{ color: "var(--theme-text-muted)" }}>
                    <span>
                      Budget: <strong style={{ color: "var(--theme-text-main)" }}>NPR {Number(pref.budget).toLocaleString()}</strong>
                    </span>
                    <span>
                      Max days: <strong style={{ color: "var(--theme-text-main)" }}>{pref.maxDurationDays}</strong>
                    </span>
                    {pref.preferredSeason && (
                      <span>
                        Month: <strong style={{ color: "var(--theme-text-main)" }}>{pref.preferredSeason}</strong>
                      </span>
                    )}
                  </div>

                  {Array.isArray(pref.interests) && pref.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {pref.interests.map((int, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-lg border"
                          style={{
                            backgroundColor: "var(--theme-surface)",
                            borderColor: "var(--theme-border-subtle)",
                            color: "var(--theme-text-main)",
                          }}
                        >
                          {int}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupConsensusPanel;
