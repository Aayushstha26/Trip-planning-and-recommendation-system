import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Compass,
  ArrowLeft,
  Calendar,
  Users,
  Copy,
  Check,
  MapPin,
  Trash2,
  LogOut,
  UserX,
  Shield,
  Loader2,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGroupDetails,
  useDeleteGroup,
  useLeaveGroup,
  useRemoveMember,
} from "@/hooks/useGroup";
import { useAppSelector } from "@/store/hooks";
import { DeleteGroupDialog, RemoveMemberDialog } from "@/components/planner";

export const TripDetails = () => {
  const { id: groupId } = useParams();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.user);
  console.log(currentUser);
  const [copiedCode, setCopiedCode] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: group, isLoading, isError, error } = useGroupDetails(groupId);

  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup({
    onSuccess: () => {
      toast.success("Trip deleted successfully");
      navigate("/planner");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete trip");
    },
  });

  const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup({
    onSuccess: () => {
      toast.success("You left the trip successfully");
      navigate("/planner");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to leave trip");
    },
  });

  const { mutate: removeMember, isPending: isRemoving } = useRemoveMember({
    onSuccess: () => {
      toast.success("Member removed successfully");
      setMemberToRemove(null);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to remove member");
    },
  });

  const handleCopyCode = async () => {
    if (!group?.inviteCode) return;

    try {
      await navigator.clipboard.writeText(group.inviteCode);
      setCopiedCode(true);
      toast.success("Invite code copied to clipboard");
      setTimeout(() => setCopiedCode(false), 2500);
    } catch (error) {
      toast.error("Failed to copy invite code");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--theme-border-highlight)" }}
        />
        <p
          className="mt-3 text-sm font-semibold"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Loading trip details...
        </p>
      </div>
    );
  }

  if (isError || !group) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div
          className="h-16 w-16 mx-auto rounded-3xl flex items-center justify-center mb-4"
          style={{
            backgroundColor: "var(--theme-elevated)",
            color: "var(--theme-text-main)",
          }}
        >
          <Compass className="h-8 w-8" />
        </div>
        <h2
          className="text-2xl font-bold"
          style={{ color: "var(--theme-text-main)" }}
        >
          Unable to Load Trip
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--theme-text-muted)" }}
        >
          {error?.message ||
            "You might not have access to this trip, or it may have been deleted."}
        </p>
        <div className="mt-6">
          <Button asChild variant="outline" className="rounded-xl font-bold">
            <Link to="/planner">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back to Trip Planner
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = currentUser?.id && group.ownerId === currentUser.id;
  console.log(isOwner);
  const members = group.members || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/planner"
          className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:underline"
          style={{ color: "var(--theme-text-muted)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all trips
        </Link>
      </div>

      {/* Hero Header Card */}
      <div
        className="rounded-3xl border p-6 sm:p-8 shadow-xl relative overflow-hidden"
        style={{
          backgroundColor: "var(--theme-surface-solid)",
          borderColor: "var(--theme-border)",
          boxShadow: "var(--theme-card-shadow)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
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
                {isOwner ? "👑 You are Owner" : "👥 You are Member"}
              </span>

              {group.destination && (
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
              )}
            </div>

            <h1
              className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: "var(--theme-text-main)" }}
            >
              {group.name}
            </h1>

            <div
              className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold"
              style={{ color: "var(--theme-text-muted)" }}
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
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
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>
                  {members.length}{" "}
                  {members.length === 1 ? "traveler" : "travelers"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                <span>
                  Organized by {group.owner?.name || group.owner?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Invite Box & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Invite Code Box */}
            <div
              className="p-3 rounded-2xl border flex items-center justify-between gap-3 shadow-sm"
              style={{
                backgroundColor: "var(--theme-elevated)",
                borderColor: "var(--theme-border-subtle)",
              }}
            >
              <div>
                <span
                  className="text-[10px] font-bold block uppercase tracking-wider"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Invite Code
                </span>
                <span
                  className="font-mono text-base font-extrabold tracking-widest"
                  style={{ color: "var(--theme-text-main)" }}
                >
                  {group.inviteCode}
                </span>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={handleCopyCode}
                className="rounded-xl font-bold text-xs cursor-pointer transition-all hover:brightness-95 active:scale-95"
                style={{
                  backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                  color: "var(--theme-btn-text, #06110d)",
                }}
              >
                {copiedCode ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span className="ml-1">{copiedCode ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            {/* Leave / Delete Action */}
            {isOwner ? (
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="rounded-xl font-bold text-xs cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Delete Trip
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => leaveGroup(groupId)}
                disabled={isLeaving}
                className="rounded-xl font-bold text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
              >
                {isLeaving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                ) : (
                  <LogOut className="h-3.5 w-3.5 mr-1" />
                )}
                Leave Trip
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Roster, Right Destination & Recommendation */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Members Roster (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className="rounded-3xl border p-6 shadow-md"
            style={{
              backgroundColor: "var(--theme-surface-solid)",
              borderColor: "var(--theme-border)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  className="text-xl font-extrabold tracking-tight"
                  style={{ color: "var(--theme-text-main)" }}
                >
                  Travelers Roster
                </h2>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Members who have joined this trip and their roles.
                </p>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-xl"
                style={{
                  backgroundColor: "var(--theme-elevated)",
                  color: "var(--theme-text-main)",
                }}
              >
                {members.length} Members
              </span>
            </div>

            {/* Members List */}
            <div
              className="divide-y"
              style={{ borderColor: "var(--theme-border-subtle)" }}
            >
              {members.map((member) => {
                const memberUser = member.user || {};
                const isMemberOwner = member.role === "OWNER";
                const isCurrentMember = member.userId === currentUser?.id;

                return (
                  <div
                    key={member.id}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle */}
                      <div
                        className="h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm"
                        style={{
                          backgroundColor: "var(--theme-elevated)",
                          color: "var(--theme-text-main)",
                        }}
                      >
                        {(memberUser.name || memberUser.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-bold"
                            style={{ color: "var(--theme-text-main)" }}
                          >
                            {memberUser.name || "Member"}
                          </span>
                          {isCurrentMember && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              You
                            </span>
                          )}
                          <span
                            className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor: isMemberOwner
                                ? "var(--theme-border-highlight)"
                                : "var(--theme-elevated)",
                              color: isMemberOwner
                                ? "#06110d"
                                : "var(--theme-text-muted)",
                            }}
                          >
                            {member.role}
                          </span>
                        </div>
                        <span
                          className="text-xs block"
                          style={{ color: "var(--theme-text-muted)" }}
                        >
                          {memberUser.email}
                        </span>
                      </div>
                    </div>

                    {/* Member Controls (Owner can remove non-owners) */}
                    <div className="flex items-center gap-2">
                      {isOwner && !isMemberOwner && (
                        <button
                          type="button"
                          onClick={() => setMemberToRemove(member)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Remove member from trip"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Destination & AI Recommendation Card (1 col) */}
        <div className="space-y-6">
          <div
            className="rounded-3xl border p-6 shadow-md"
            style={{
              backgroundColor: "var(--theme-surface-solid)",
              borderColor: "var(--theme-border)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles
                className="h-5 w-5"
                style={{ color: "var(--theme-border-highlight)" }}
              />
              <h3
                className="text-lg font-extrabold tracking-tight"
                style={{ color: "var(--theme-text-main)" }}
              >
                Destination & Itinerary
              </h3>
            </div>

            {group.destination ? (
              <div className="space-y-3">
                <div
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--theme-elevated)",
                    borderColor: "var(--theme-border-subtle)",
                  }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-wider block"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    Selected Destination
                  </span>
                  <h4
                    className="text-lg font-black mt-1"
                    style={{ color: "var(--theme-text-main)" }}
                  >
                    {group.destination.name}
                  </h4>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {group.destination.region} •{" "}
                    {group.destination.durationDays} days
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  No destination has been assigned yet. Once group members
                  complete their travel preferences, the AI recommendation
                  engine will suggest top matching destinations.
                </p>

                <div
                  className="mt-4 p-4 rounded-2xl border border-dashed"
                  style={{ borderColor: "var(--theme-border)" }}
                >
                  <div
                    className="flex items-center gap-2 text-xs font-bold"
                    style={{ color: "var(--theme-text-main)" }}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Next Phase: Preferences & AI</span>
                  </div>
                  <p
                    className="text-[11px] mt-1"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    Connect member budgets, interests, and difficulty
                    preferences to generate group rankings.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal: Delete Group */}
      <DeleteGroupDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => deleteGroup(groupId)}
        isDeleting={isDeleting}
        groupName={group.name}
      />

      {/* Confirmation Modal: Remove Member */}
      <RemoveMemberDialog
        isOpen={Boolean(memberToRemove)}
        onClose={() => setMemberToRemove(null)}
        onConfirm={() =>
          removeMember({ groupId, userId: memberToRemove?.userId })
        }
        isRemoving={isRemoving}
        member={memberToRemove}
      />
    </div>
  );
};

export default TripDetails;
