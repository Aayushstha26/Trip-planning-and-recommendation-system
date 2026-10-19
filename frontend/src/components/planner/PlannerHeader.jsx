import { Sparkles, KeyRound, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlannerHeader({ onJoin, onCreate }) {
  return (
    <div
      className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b"
      style={{ borderColor: "var(--theme-border-subtle)" }}
    >
      <div>
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-xs"
          style={{
            backgroundColor: "var(--theme-elevated)",
            color: "var(--theme-text-main)",
          }}
        >
          <Sparkles
            className="h-3.5 w-3.5"
            style={{ color: "var(--theme-border-highlight)" }}
          />
          <span>Collaborative Travel Hub</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          style={{ color: "var(--theme-text-main)" }}
        >
          Trip Planner
        </h1>
        <p
          className="mt-2 text-sm sm:text-base max-w-2xl font-medium"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Create travel groups with friends, invite members with shareable
          codes, and prepare group preferences for smart AI recommendations.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onJoin}
          className="rounded-xl font-bold cursor-pointer transition-all hover:bg-slate-800"
          style={{
            borderColor: "var(--theme-border)",
            color: "var(--theme-text-main)",
          }}
        >
          <KeyRound className="h-4 w-4 mr-1.5" />
          Join with Code
        </Button>

        <Button
          type="button"
          onClick={onCreate}
          className="rounded-xl font-bold shadow-md cursor-pointer transition-all hover:brightness-95 active:scale-95"
          style={{
            backgroundColor: "var(--theme-btn-bg, #c8ff00)",
            color: "var(--theme-btn-text, #06110d)",
          }}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Trip
        </Button>
      </div>
    </div>
  );
}
