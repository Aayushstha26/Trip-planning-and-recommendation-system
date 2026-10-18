import { useState } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
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
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGroupDetails,
  useDeleteGroup,
  useLeaveGroup,
  useRemoveMember,
} from "@/hooks/useGroup";
import { useAppSelector } from "@/store/hooks";
import {
  DeleteGroupDialog,
  RemoveMemberDialog,
  InlinePreferenceForm,
  GroupConsensusPanel,
} from "@/components/planner";

export const TripDetails = () => {
  const { id: groupId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useAppSelector((state) => state.auth.user);

  const activeTab = searchParams.get("tab") || "overview";

  const setTab = (tabName) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (tabName === "overview") next.delete("tab");
      else next.set("tab", tabName);
      return next;
    });
  };

  const [copiedCode, setCopiedCode] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: group, isLoading, isError, error } = useGroupDetails(groupId);

  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup({
    onSuccess: () => {
      toast.success("Trip deleted successfully");
      navigate("/dashboard/planner");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete trip");
    },
  });

  const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup({
    onSuccess: () => {
      toast.success("You left the trip successfully");
      navigate("/dashboard/planner");
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
    } catch {
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
            <Link to="/dashboard/planner">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back to Trip Planner
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = currentUser?.id && group.ownerId === currentUser.id;
  const members = group.members || [];
  const myMembership = members.find((m) => m.userId === currentUser?.id);
  const myPreference = myMembership?.preference;
  const submittedCount = members.filter((m) => Boolean(m.preference)).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors">
      {/* Back Link */}
      <div className="mb-5">
        <Link
          to="/dashboard/planner"
          className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:underline"
          style={{ color: "var(--theme-text-muted)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all trips
        </Link>
      </div>

      {/* ── Cohesive Hero Header ── */}
      <div
        className="rounded-3xl border p-6 sm:p-7 shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: "var(--theme-surface-solid)",
          borderColor: "var(--theme-border)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span
                className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border"
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
                {isOwner ? "👑 Organizer / Owner" : "👥 Group Member"}
              </span>

              {group.destination && (
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-lg"
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
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: "var(--theme-text-main)" }}
            >
              {group.name}
            </h1>

            <div
              className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-medium"
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
                <span>By {group.owner?.name || group.owner?.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Invite & Action Box */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="p-2.5 px-3.5 rounded-2xl border flex items-center gap-3"
              style={{
                backgroundColor: "var(--theme-elevated)",
                borderColor: "var(--theme-border-subtle)",
              }}
            >
              <div>
                <span
                  className="text-[9px] font-bold block uppercase tracking-wider"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Invite Code
                </span>
                <span
                  className="font-mono text-sm font-black tracking-wider"
                  style={{ color: "var(--theme-text-main)" }}
                >
                  {group.inviteCode}
                </span>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={handleCopyCode}
                className="h-8 rounded-xl font-bold text-xs cursor-pointer transition-all hover:brightness-95 active:scale-95"
                style={{
                  backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                  color: "var(--theme-btn-text, #06110d)",
                }}
              >
                {copiedCode ? (
                  <Check className="h-3 w-3 mr-1" />
                ) : (
                  <Copy className="h-3 w-3 mr-1" />
                )}
                <span>{copiedCode ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            {isOwner ? (
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="h-10 rounded-xl font-bold text-xs cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Delete Trip
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => leaveGroup(groupId)}
                disabled={isLeaving}
                className="h-10 rounded-xl font-bold text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
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

      {/* ── Seamless Segmented Tab Navigation ── */}
      <div
        className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <div
          className="inline-flex p-1 rounded-2xl border"
          style={{
            backgroundColor: "var(--theme-surface-solid)",
            borderColor: "var(--theme-border)",
          }}
        >
          <button
            type="button"
            onClick={() => setTab("overview")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "overview"
                  ? "var(--theme-elevated)"
                  : "transparent",
              color:
                activeTab === "overview"
                  ? "var(--theme-text-main)"
                  : "var(--theme-text-muted)",
              boxShadow:
                activeTab === "overview" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Trip & Travelers</span>
            <span
              className="text-[10px] px-1.5 py-0.2 rounded-full"
              style={{
                backgroundColor: "var(--theme-surface)",
                color: "var(--theme-text-muted)",
              }}
            >
              {members.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTab("preferences")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer relative"
            style={{
              backgroundColor:
                activeTab === "preferences"
                  ? "var(--theme-elevated)"
                  : "transparent",
              color:
                activeTab === "preferences"
                  ? "var(--theme-text-main)"
                  : "var(--theme-text-muted)",
              boxShadow:
                activeTab === "preferences"
                  ? "0 1px 3px rgba(0,0,0,0.1)"
                  : "none",
            }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Preferences & Planning</span>
            {myPreference ? (
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                title="Your preferences are saved"
              />
            ) : (
              <span
                className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"
                title="Your preferences are pending"
              />
            )}
          </button>
        </div>

        {/* Quick Help Status */}
        <div
          className="text-xs font-semibold"
          style={{ color: "var(--theme-text-muted)" }}
        >
          {myPreference ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-500">
              <Check className="h-3.5 w-3.5" /> Your preferences are recorded
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-amber-500 font-bold">
              <Sparkles className="h-3.5 w-3.5" /> Action needed: Set your
              travel preferences
            </span>
          )}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="mt-6">
        {activeTab === "overview" ? (
          <div className="space-y-6">
            {/* Action Banner if preferences not yet filled */}
            {!myPreference && (
              <div
                className="rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{
                  backgroundColor: "var(--theme-surface-solid)",
                  borderColor: "var(--theme-border)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-extrabold"
                      style={{ color: "var(--theme-text-main)" }}
                    >
                      Your travel preferences are pending
                    </h4>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      Share your budget, duration, and interests so the group
                      recommendation engine can find matching destinations.
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  onClick={() => setTab("preferences")}
                  className="rounded-xl font-bold text-xs cursor-pointer shrink-0 transition-all hover:brightness-95 active:scale-95"
                  style={{
                    backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                    color: "var(--theme-btn-text, #06110d)",
                  }}
                >
                  Set Preferences Now
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            )}

            {/* 2-Column Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Travelers Roster (2 cols) */}
              <div className="lg:col-span-2">
                <div
                  className="rounded-3xl border p-6 shadow-sm"
                  style={{
                    backgroundColor: "var(--theme-surface-solid)",
                    borderColor: "var(--theme-border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2
                        className="text-lg font-extrabold tracking-tight"
                        style={{ color: "var(--theme-text-main)" }}
                      >
                        Travelers Roster
                      </h2>
                      <p
                        className="text-xs"
                        style={{ color: "var(--theme-text-muted)" }}
                      >
                        Members on this trip and their preferences status.
                      </p>
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-xl"
                      style={{
                        backgroundColor: "var(--theme-elevated)",
                        color: "var(--theme-text-main)",
                      }}
                    >
                      {submittedCount} / {members.length} Ready
                    </span>
                  </div>

                  <div
                    className="divide-y"
                    style={{ borderColor: "var(--theme-border-subtle)" }}
                  >
                    {members.map((member) => {
                      const memberUser = member.user || {};
                      const isMemberOwner = member.role === "OWNER";
                      const isCurrentMember = member.userId === currentUser?.id;
                      const pref = member.preference;

                      return (
                        <div
                          key={member.id}
                          className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm shrink-0"
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
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    You
                                  </span>
                                )}
                                <span
                                  className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded"
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

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            {pref ? (
                              <button
                                type="button"
                                onClick={() => setTab("preferences")}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all hover:brightness-110 cursor-pointer"
                                style={{
                                  backgroundColor: "var(--theme-elevated)",
                                  borderColor: "var(--theme-border-subtle)",
                                  color: "var(--theme-text-main)",
                                }}
                                title="Click to view full preferences in Planning tab"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span>
                                  NPR {(pref.budget / 1000).toFixed(0)}k •{" "}
                                  {pref.difficulty}
                                </span>
                              </button>
                            ) : isCurrentMember ? (
                              <button
                                type="button"
                                onClick={() => setTab("preferences")}
                                className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl border border-dashed transition-all hover:brightness-95 cursor-pointer"
                                style={{
                                  backgroundColor: "var(--theme-elevated)",
                                  borderColor: "var(--theme-border-highlight)",
                                  color: "var(--theme-border-highlight)",
                                }}
                              >
                                <Sparkles className="h-3 w-3" />
                                <span>+ Set Preferences</span>
                              </button>
                            ) : (
                              <span
                                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg opacity-60"
                                style={{
                                  backgroundColor: "var(--theme-elevated)",
                                  color: "var(--theme-text-muted)",
                                }}
                              >
                                Pending
                              </span>
                            )}

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

              {/* Right Column: Destination Status (1 col) */}
              <div>
                <div
                  className="rounded-3xl border p-6 shadow-sm space-y-4"
                  style={{
                    backgroundColor: "var(--theme-surface-solid)",
                    borderColor: "var(--theme-border)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles
                      className="h-5 w-5"
                      style={{ color: "var(--theme-border-highlight)" }}
                    />
                    <h3
                      className="text-base font-extrabold tracking-tight"
                      style={{ color: "var(--theme-text-main)" }}
                    >
                      Destination & Route
                    </h3>
                  </div>

                  {group.destination ? (
                    <div
                      className="p-4 rounded-2xl border"
                      style={{
                        backgroundColor: "var(--theme-elevated)",
                        borderColor: "var(--theme-border-subtle)",
                      }}
                    >
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider block"
                        style={{ color: "var(--theme-text-muted)" }}
                      >
                        Assigned Destination
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
                  ) : (
                    <div className="space-y-3">
                      <p
                        className="text-xs"
                        style={{ color: "var(--theme-text-muted)" }}
                      >
                        {submittedCount > 0
                          ? `${submittedCount} of ${members.length} travelers have provided input. As soon as preferences are set, AI matches top routes.`
                          : "No destination selected yet. Group members will collaborate via preferences to select the ideal trek."}
                      </p>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setTab("preferences")}
                        className="w-full rounded-xl font-bold text-xs cursor-pointer"
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
                        Go to Preferences & Planning
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── PREFERENCES TAB: 100% Inline Form + Group Consensus Side-by-Side (NO MODAL) ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Inline Preferences Form (7 cols) */}
            <div className="lg:col-span-7">
              <InlinePreferenceForm
                groupId={groupId}
                initialPreference={myPreference}
              />
            </div>

            {/* Right: Group Consensus & Traveler Submissions (5 cols) */}
            <div className="lg:col-span-5">
              <GroupConsensusPanel group={group} />
            </div>
          </div>
        )}
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
