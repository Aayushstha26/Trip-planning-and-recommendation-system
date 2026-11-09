import { Compass, Loader2, KeyRound, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TripListState({
  isLoading,
  isError,
  isEmpty,
  hasFilters,
  onRefetch,
  onClearFilters,
  onJoin,
  onCreate,
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--theme-border-highlight)" }}
        />
        <p
          className="mt-3 text-sm font-semibold"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Loading your trips...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="rounded-3xl border border-dashed p-10 text-center"
        style={{
          backgroundColor: "var(--theme-surface)",
          borderColor: "var(--theme-border)",
        }}
      >
        <p className="text-sm font-semibold text-red-500 mb-3">
          Unable to load your trips at the moment.
        </p>
        <Button
          onClick={onRefetch}
          variant="outline"
          size="sm"
          className="rounded-xl font-bold cursor-pointer"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        className="rounded-3xl border border-dashed p-12 text-center transition-all"
        style={{
          backgroundColor: "var(--theme-surface)",
          borderColor: "var(--theme-border)",
        }}
      >
        <div
          className="h-16 w-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-xs"
          style={{
            backgroundColor: "var(--theme-elevated)",
            color: "var(--theme-text-main)",
          }}
        >
          <Compass className="h-8 w-8" />
        </div>
        <h3
          className="text-lg font-bold"
          style={{ color: "var(--theme-text-main)" }}
        >
          {hasFilters ? "No matching trips found" : "No trips planned yet"}
        </h3>
        <p
          className="mt-1 text-sm max-w-md mx-auto"
          style={{ color: "var(--theme-text-muted)" }}
        >
          {hasFilters
            ? "Try adjusting your search criteria or reset your active filters."
            : "Kickstart your adventure! Create a new travel group or enter an invite code from a friend."}
        </p>
        {hasFilters ? (
          <div className="mt-5">
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="sm"
              className="rounded-xl font-bold cursor-pointer"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              onClick={onJoin}
              variant="outline"
              className="rounded-xl font-bold cursor-pointer"
            >
              <KeyRound className="h-4 w-4 mr-1.5" />
              Join with Code
            </Button>
            <Button
              onClick={onCreate}
              className="rounded-xl font-bold shadow-md cursor-pointer transition-all hover:brightness-95 active:scale-95"
              style={{
                backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                color: "var(--theme-btn-text, #06110d)",
              }}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Create First Trip
            </Button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
