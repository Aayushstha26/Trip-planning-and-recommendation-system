import { useState } from "react";
import {
  Compass,
  Plus,
  Search,
  Sparkles,
  KeyRound,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMyGroups } from "@/hooks/useGroup";
import { useAppSelector } from "@/store/hooks";
import {
  TripCard,
  CreateGroupModal,
  JoinGroupModal,
} from "@/components/planner";

/**
 * TripPlanner Dashboard Page
 * Main view for managing travel groups, creating new trips, and joining existing trips.
 */
export const TripPlanner = () => {

  const currentUser = useAppSelector((state) => state.auth.user);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // FETCH USER'S TRIPS
  const { data: groups = [], isLoading } = useMyGroups();

  const filteredGroups = groups.filter((group) =>
    group.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors">
      {/* Page Header */}
      <div
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b"
        style={{ borderColor: "var(--theme-border-subtle)" }}
      >
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm"
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

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsJoinModalOpen(true)}
            className="rounded-xl font-bold cursor-pointer text-white"
          >
            <KeyRound className="h-4 w-4 mr-1.5" />
            Join with Code
          </Button>

          <Button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
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

      {/* Search and Filters Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your trips..."
            className="w-full border rounded-xl pl-10 pr-4 py-2 text-sm font-medium focus:outline-none transition-colors"
            style={{
              backgroundColor: "var(--theme-surface-solid)",
              borderColor: "var(--theme-border-subtle)",
              color: "var(--theme-text-main)",
            }}
          />
        </div>

        <div
          className="text-xs font-bold"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Total trips:{" "}
          <span style={{ color: "var(--theme-text-main)" }}>
            {groups.length}
          </span>
        </div>
      </div>

      {/* Trips Content */}
      <div className="mt-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "var(--theme-border-highlight)" }}
            />
            <p
              className="mt-3 text-sm font-semibold"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Loading your travel groups...
            </p>
          </div>
        ) : filteredGroups.length === 0 ? (
          /* Empty State */
          <div
            className="rounded-3xl border border-dashed p-12 text-center transition-all"
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-border)",
            }}
          >
            <div
              className="h-16 w-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-sm"
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
              {searchQuery ? "No matching trips found" : "No trips planned yet"}
            </h3>
            <p
              className="mt-1 text-sm max-w-md mx-auto"
              style={{ color: "var(--theme-text-muted)" }}
            >
              {searchQuery
                ? "Try a different search query or clear the filter."
                : "Start your journey by creating your first travel group, or enter a friend’s invite code to join theirs."}
            </p>
            {!searchQuery && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  onClick={() => setIsJoinModalOpen(true)}
                  variant="outline"
                  className="rounded-xl font-bold cursor-pointer"
                >
                  <KeyRound className="h-4 w-4 mr-1.5" />
                  Join Trip
                </Button>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
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
        ) : (
          /* Trip Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <TripCard
                key={group.id}
                group={group}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Components */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
};

export default TripPlanner;
