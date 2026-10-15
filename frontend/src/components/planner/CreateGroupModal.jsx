import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createGroupSchema, createGroupDefaultValues } from "@/schemas";
import { useCreateGroup } from "@/hooks/useGroup";

export const CreateGroupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { mutate: createGroup, isPending } = useCreateGroup({
    onSuccess: (data) => {
      toast.success(`Group ${data.name} created successfully!`);
      // console.log(data);
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
    resolver: zodResolver(createGroupSchema),
    defaultValues: createGroupDefaultValues,
    mode: "onTouched",
  });

  const onSubmit = (formData) => {
    const payload = {
      name: formData.name.trim(),
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : undefined,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : undefined,
    };

    createGroup(payload);
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
            Create New Trip Group
          </h2>
          <p
            className="text-xs font-medium mt-1"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Set a title and optional dates. You will receive an invite code to
            share with friends.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Trip Name */}
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-1"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Group Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Annapurna Trek Expedition"
              className="w-full border rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none transition-colors"
              style={{
                backgroundColor: "var(--theme-elevated)",
                borderColor: errors.name
                  ? "rgb(239 68 68)"
                  : "var(--theme-border-subtle)",
                color: "var(--theme-text-main)",
              }}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Travel Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Start Date
              </label>
              <input
                type="date"
                className="w-full border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition-colors"
                style={{
                  backgroundColor: "var(--theme-elevated)",
                  borderColor: "var(--theme-border-subtle)",
                  color: "var(--theme-text-main)",
                }}
                {...register("startDate")}
              />
            </div>

            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: "var(--theme-text-muted)" }}
              >
                End Date
              </label>
              <input
                type="date"
                className="w-full border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition-colors"
                style={{
                  backgroundColor: "var(--theme-elevated)",
                  borderColor: errors.endDate
                    ? "rgb(239 68 68)"
                    : "var(--theme-border-subtle)",
                  color: "var(--theme-text-main)",
                }}
                {...register("endDate")}
              />
            </div>
          </div>
          {errors.endDate && (
            <p className="text-xs text-red-500 font-medium">
              {errors.endDate.message}
            </p>
          )}

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
                  Creating Trip...
                </>
              ) : (
                "Create Trip Group"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
