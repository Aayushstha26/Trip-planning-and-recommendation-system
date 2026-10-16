import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Check,
  Loader2,
  AlertCircle,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateProfileSchema } from "@/schemas/user.schema";
import { useUpdateProfile } from "@/hooks/useUserProfile";

export const ProfileInfoForm = ({ user }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  useEffect(() => {
    if (user?.name) {
      reset({ name: user.name });
    }
  }, [user?.name, reset]);

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update profile");
    },
  });

  const onSubmit = (formData) => {
    const trimmedName = formData.name.trim();
    if (trimmedName === (user?.name || "").trim()) {
      toast.info("No changes were made.");
      return;
    }

    updateProfile({ name: trimmedName });
  };

  const handleReset = () => {
    reset({ name: user?.name || "" });
  };

  return (
    <div
      className="rounded-3xl border p-6 sm:p-8 shadow-sm transition-all"
      style={{
        backgroundColor: "var(--theme-surface-solid)",
        borderColor: "var(--theme-border-subtle)",
      }}
    >
      <div className="mb-6">
        <h2
          className="text-lg sm:text-xl font-bold tracking-tight"
          style={{ color: "var(--theme-text-main)" }}
        >
          Personal Information
        </h2>
        <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--theme-text-muted)" }}>
          Update your public profile display name and view account info.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="profile-name"
            className="block text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--theme-text-main)" }}
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <User className="h-4 w-4 opacity-50" style={{ color: "var(--theme-text-muted)" }} />
            </div>
            <Input
              id="profile-name"
              type="text"
              placeholder="e.g. John Doe"
              {...register("name")}
              disabled={isPending}
              className="pl-10 h-11 rounded-2xl border font-medium text-sm transition-colors"
              style={{
                backgroundColor: "var(--theme-bg)",
                borderColor: errors.name ? "red" : "var(--theme-border-subtle)",
                color: "var(--theme-text-main)",
              }}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field (Read-only) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="profile-email"
              className="block text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--theme-text-main)" }}
            >
              Email Address
            </label>
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: "var(--theme-elevated)",
                color: "var(--theme-text-muted)",
              }}
            >
              Cannot be changed
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 opacity-40" style={{ color: "var(--theme-text-muted)" }} />
            </div>
            <Input
              id="profile-email"
              type="email"
              value={user?.email || ""}
              readOnly
              disabled
              className="pl-10 h-11 rounded-2xl border opacity-75 cursor-not-allowed font-medium text-sm"
              style={{
                backgroundColor: "var(--theme-elevated)",
                borderColor: "var(--theme-border-subtle)",
                color: "var(--theme-text-muted)",
              }}
            />
          </div>
          <p className="text-[11px]" style={{ color: "var(--theme-text-muted)" }}>
            Your email is used for logging into your account.
          </p>
        </div>

        {/* Account Role & Identifier Info Card */}
        <div
          className="p-4 rounded-2xl border flex items-center justify-between gap-4"
          style={{
            backgroundColor: "var(--theme-elevated)",
            borderColor: "var(--theme-border-subtle)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs"
              style={{
                backgroundColor: "var(--theme-surface-solid)",
                color: "var(--theme-text-main)",
              }}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--theme-text-main)" }}>
                Account Role: {user?.role || "USER"}
              </p>
              <p className="text-[11px]" style={{ color: "var(--theme-text-muted)" }}>
                Account ID #{user?.id || ""}
              </p>
            </div>
          </div>
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-xl uppercase tracking-wider"
            style={{
              backgroundColor: "var(--theme-surface-solid)",
              color: "var(--theme-text-main)",
            }}
          >
            Active
          </span>
        </div>

        {/* Action Buttons */}
        <div
          className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t"
          style={{ borderColor: "var(--theme-border-subtle)" }}
        >
          {isDirty && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={isPending}
              className="w-full sm:w-auto rounded-xl font-bold cursor-pointer text-xs transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
          )}

          <Button
            type="submit"
            size="sm"
            disabled={isPending || !isDirty}
            className="w-full sm:w-auto rounded-xl font-bold text-xs cursor-pointer shadow-sm transition-all hover:brightness-95 active:scale-95 disabled:opacity-50"
            style={{
              backgroundColor: "var(--theme-btn-bg, #c8ff00)",
              color: "var(--theme-btn-text, #06110d)",
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
