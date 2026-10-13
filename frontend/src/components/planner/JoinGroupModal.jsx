import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinGroupSchema, joinGroupDefaultValues } from "@/schemas";
import { useJoinGroup } from "@/hooks/useGroup";

export const JoinGroupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { mutate: joinGroup, isPending } = useJoinGroup({
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      reset();
      onClose();
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(joinGroupSchema),
    defaultValues: joinGroupDefaultValues,
    mode: "onTouched",
  });

  const onSubmit = (formdata) => {
    joinGroup({ inviteCode: formdata.inviteCode.trim().toUpperCase() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-3xl border p-6 shadow-2xl relative"
        style={{
          backgroundColor: "var(--theme-surface-solid)",
          borderColor: "var(--theme-border)",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" style={{ color: "var(--theme-text-muted)" }} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2
            className="text-xl font-extrabold tracking-tight"
            style={{ color: "var(--theme-text-main)" }}
          >
            Join an Existing Trip
          </h2>
          <p
            className="text-xs font-medium mt-1"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Enter the 8-character invite code provided by your trip organizer.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-1"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Invite Code *
            </label>
            <div className="relative">
              <KeyRound className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                maxLength={12}
                placeholder="e.g. 7A8B9C1D"
                className="w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono font-bold uppercase tracking-wider focus:outline-none transition-colors"
                style={{
                  backgroundColor: "var(--theme-elevated)",
                  borderColor: errors.inviteCode
                    ? "rgb(239 68 68)"
                    : "var(--theme-border-subtle)",
                  color: "var(--theme-text-main)",
                }}
                {...register("inviteCode")}
              />
            </div>
            {errors.inviteCode && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.inviteCode.message}
              </p>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl font-bold text-sm py-3 cursor-pointer transition-all hover:brightness-95 active:scale-95"
              style={{
                backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                color: "var(--theme-btn-text, #06110d)",
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Joining Trip...
                </>
              ) : (
                "Join Trip"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGroupModal;
