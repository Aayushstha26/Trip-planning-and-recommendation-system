import { Link } from "react-router-dom";
import {
  SlidersHorizontal,
  Compass,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMyGroups } from "@/hooks/useGroup";
import { useAppSelector } from "@/store/hooks";

export default function DashboardPreferences() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const { data: groups, isLoading } = useMyGroups();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--theme-border-highlight)" }}
        />
        <p
          className="mt-3 text-xs font-semibold"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Loading your travel preferences...
        </p>
      </div>
    );
  }

  const tripList = Array.isArray(groups) ? groups : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="p-1.5 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "var(--theme-elevated)",
              color: "var(--theme-border-highlight)",
            }}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </span>
          <span
            className="text-xs font-extrabold uppercase tracking-wider"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Trip Customization
          </span>
        </div>
        <h1
          className="text-2xl sm:text-3xl font-black tracking-tight"
          style={{ color: "var(--theme-text-main)" }}
        >
          Travel Preferences
        </h1>
        <p
          className="text-xs sm:text-sm max-w-2xl mt-1"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Manage your personal budget, difficulty, and interests across your
          active trip groups. Both group owners and members submit preferences
          so the AI engine can recommend the optimal group destinations.
        </p>
      </div>

      {/* Trips Preferences Grid */}
      {tripList.length === 0 ? (
        <div
          className="p-10 text-center rounded-3xl border border-dashed"
          style={{
            backgroundColor: "var(--theme-surface-solid)",
            borderColor: "var(--theme-border)",
          }}
        >
          <Compass
            className="h-12 w-12 mx-auto mb-3 opacity-40"
            style={{ color: "var(--theme-text-muted)" }}
          />
          <h3
            className="text-base font-bold"
            style={{ color: "var(--theme-text-main)" }}
          >
            No Active Trips Found
          </h3>
          <p
            className="text-xs mt-1 max-w-sm mx-auto"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Create or join a trip group first to define your preferences and get
            personalized recommendations.
          </p>
          <div className="mt-5">
            <Button asChild className="rounded-xl font-bold text-xs">
              <Link to="/dashboard/planner">Go to Trip Planner</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {tripList.map((trip) => {
            const isOwner = trip.ownerId === currentUser?.id;
            return (
              <div
                key={trip.id}
                className="rounded-3xl border p-5 sm:p-6 shadow-sm transition-all hover:shadow-md relative overflow-hidden"
                style={{
                  backgroundColor: "var(--theme-surface-solid)",
                  borderColor: "var(--theme-border)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: isOwner
                            ? "var(--theme-border-highlight)"
                            : "var(--theme-elevated)",
                          color: isOwner
                            ? "#06110d"
                            : "var(--theme-text-muted)",
                        }}
                      >
                        {isOwner ? "👑 Owner" : "👥 Member"}
                      </span>
                      {trip.destination && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: "var(--theme-elevated)",
                            color: "var(--theme-text-main)",
                          }}
                        >
                          {trip.destination.name}
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-lg font-black tracking-tight"
                      style={{ color: "var(--theme-text-main)" }}
                    >
                      {trip.name}
                    </h3>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      Invite code:{" "}
                      <span className="font-mono font-bold tracking-wider">
                        {trip.inviteCode}
                      </span>{" "}
                      • {trip._count?.members || 1} traveler
                      {trip._count?.members === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Button
                      asChild
                      className="rounded-xl font-bold text-xs cursor-pointer transition-all hover:brightness-95 active:scale-95"
                      style={{
                        backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                        color: "var(--theme-btn-text, #06110d)",
                      }}
                    >
                      <Link
                        to={`/dashboard/planner/${trip.id}?tab=preferences`}
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        Manage Preferences
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-xl font-bold text-xs"
                    >
                      <Link to={`/dashboard/planner/${trip.id}`}>
                        View Trip
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
