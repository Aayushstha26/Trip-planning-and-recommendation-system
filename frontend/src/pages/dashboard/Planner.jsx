import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useMyGroups, useDeleteGroup, useLeaveGroup } from "@/hooks/useGroup";
import { useAppSelector } from "@/store/hooks";
import {
  PlannerHeader,
  StatsBar,
  FilterBar,
  TripCard,
  TripListState,
  LeaveTripDialog,
  CreateGroupModal,
  JoinGroupModal,
  DeleteGroupDialog,
} from "@/components/planner";

export const Planner = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [groupToLeave, setGroupToLeave] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  // Data
  const { data: groups = [], isLoading, isError, refetch } = useMyGroups();

  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup({
    onSuccess: () => {
      toast.success("Trip deleted successfully");
      setGroupToDelete(null);
    },
    onError: (err) => toast.error(err?.message || "Failed to delete trip"),
  });

  const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup({
    onSuccess: () => {
      toast.success("You have left the trip");
      setGroupToLeave(null);
    },
    onError: (err) => toast.error(err?.message || "Failed to leave trip"),
  });

  const handleCopyCode = (e, inviteCode, groupId) => {
    e.stopPropagation();
    e.preventDefault();
    if (!inviteCode) return;
    navigator.clipboard.writeText(inviteCode);
    setCopiedId(groupId);
    toast.success("Invite code copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Quick stats
  const stats = useMemo(() => {
    const total = groups.length;
    const organizing = groups.filter((g) => g.ownerId === currentUser?.id).length;
    const joined = total - organizing;
    const withDestination = groups.filter((g) =>
      Boolean(g.destinationId || g.destination),
    ).length;
    return { total, organizing, joined, withDestination };
  }, [groups, currentUser?.id]);

  // Filtered + sorted list
  const filteredGroups = useMemo(() => {
    let result = [...groups];

    if (activeFilter === "organizing") {
      result = result.filter((g) => g.ownerId === currentUser?.id);
    } else if (activeFilter === "joined") {
      result = result.filter((g) => g.ownerId !== currentUser?.id);
    } else if (activeFilter === "upcoming") {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      result = result.filter((g) => {
        if (!g.startDate) return false;
        const end = g.endDate ? new Date(g.endDate) : new Date(g.startDate);
        return end >= now;
      });
    } else if (activeFilter === "planning") {
      result = result.filter((g) => !g.destinationId && !g.destination);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name?.toLowerCase().includes(q) ||
          g.destination?.name?.toLowerCase().includes(q) ||
          g.destination?.region?.toLowerCase().includes(q) ||
          g.inviteCode?.toLowerCase().includes(q),
      );
    }

    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return result;
  }, [groups, activeFilter, searchQuery, currentUser?.id]);

  const hasFilters = Boolean(searchQuery || activeFilter !== "all");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors">
      <PlannerHeader
        onJoin={() => setIsJoinModalOpen(true)}
        onCreate={() => setIsCreateModalOpen(true)}
      />

      <StatsBar stats={stats} />

      <FilterBar
        stats={stats}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mt-8">
        <TripListState
          isLoading={isLoading}
          isError={isError}
          isEmpty={filteredGroups.length === 0}
          hasFilters={hasFilters}
          onRefetch={refetch}
          onClearFilters={() => {
            setSearchQuery("");
            setActiveFilter("all");
          }}
          onJoin={() => setIsJoinModalOpen(true)}
          onCreate={() => setIsCreateModalOpen(true)}
        />

        {!isLoading && !isError && filteredGroups.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <TripCard
                key={group.id}
                group={group}
                currentUser={currentUser}
                copiedId={copiedId}
                onCopy={handleCopyCode}
                onDelete={setGroupToDelete}
                onLeave={setGroupToLeave}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals & Dialogs */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
      <DeleteGroupDialog
        isOpen={Boolean(groupToDelete)}
        onClose={() => setGroupToDelete(null)}
        groupName={groupToDelete?.name}
        isDeleting={isDeleting}
        onConfirm={() => groupToDelete?.id && deleteGroup(groupToDelete.id)}
      />
      <LeaveTripDialog
        isOpen={Boolean(groupToLeave)}
        onClose={() => setGroupToLeave(null)}
        groupName={groupToLeave?.name}
        isLeaving={isLeaving}
        onConfirm={() => groupToLeave?.id && leaveGroup(groupToLeave.id)}
      />
    </div>
  );
};

export default Planner;
export { Planner as TripPlanner };
