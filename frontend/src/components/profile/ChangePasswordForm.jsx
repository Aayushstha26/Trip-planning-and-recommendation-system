import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Lock,
  Eye,
  EyeOff,
  Check,
  KeyRound,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { changePasswordSchema } from "@/schemas/user.schema";
import { useChangePassword } from "@/hooks/useUserProfile";

export const ChangePasswordForm = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword", "");

  const { mutate: changePassword, isPending } = useChangePassword({
    onSuccess: () => {
      toast.success("Password changed successfully! Keep your credentials safe.");
      reset();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to change password");
    },
  });

  const onSubmit = (data) => {
    changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  const isMinLength = newPasswordValue.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(newPasswordValue);
  const hasNumber = /[0-9]/.test(newPasswordValue);

  return (
    <div
      className="rounded-3xl border p-6 sm:p-8 shadow-sm transition-all"
      style={{
        backgroundColor: "var(--theme-surface-solid)",
        borderColor: "var(--theme-border-subtle)",
      }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-lg sm:text-xl font-bold tracking-tight"
            style={{ color: "var(--theme-text-main)" }}
          >
            Security & Password
          </h2>
          <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--theme-text-muted)" }}>
            Ensure your account is using a long, random password to stay safe.
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: "var(--theme-elevated)",
            color: "var(--theme-text-main)",
          }}
        >
          <KeyRound className="w-5 h-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Current Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="currentPassword"
            className="block text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--theme-text-main)" }}
          >
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 opacity-50" style={{ color: "var(--theme-text-muted)" }} />
            </div>
            <Input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              {...register("currentPassword")}
              disabled={isPending}
              className="pl-10 pr-10 h-11 rounded-2xl border font-medium text-sm"
              style={{
                backgroundColor: "var(--theme-bg)",
                borderColor: errors.currentPassword ? "red" : "var(--theme-border-subtle)",
                color: "var(--theme-text-main)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-muted-foreground hover:text-foreground"
            >
              {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="newPassword"
            className="block text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--theme-text-main)" }}
          >
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 opacity-50" style={{ color: "var(--theme-text-muted)" }} />
            </div>
            <Input
              id="newPassword"
              type={showNew ? "text" : "password"}
              placeholder="At least 8 characters"
              {...register("newPassword")}
              disabled={isPending}
              className="pl-10 pr-10 h-11 rounded-2xl border font-medium text-sm"
              style={{
                backgroundColor: "var(--theme-bg)",
                borderColor: errors.newPassword ? "red" : "var(--theme-border-subtle)",
                color: "var(--theme-text-main)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-muted-foreground hover:text-foreground"
            >
              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.newPassword.message}
            </p>
          )}

          {/* Real-time Checklist for Password Strength */}
          {newPasswordValue.length > 0 && (
            <div
              className="p-3 rounded-2xl border text-xs space-y-1.5 mt-2"
              style={{
                backgroundColor: "var(--theme-elevated)",
                borderColor: "var(--theme-border-subtle)",
              }}
            >
              <p className="font-semibold" style={{ color: "var(--theme-text-main)" }}>
                Password Requirements:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                <span className={`flex items-center gap-1.5 ${isMinLength ? "text-emerald-500 font-bold" : "text-muted-foreground"}`}>
                  <Check className={`w-3.5 h-3.5 ${isMinLength ? "opacity-100" : "opacity-30"}`} />
                  8+ characters
                </span>
                <span className={`flex items-center gap-1.5 ${hasLetter ? "text-emerald-500 font-bold" : "text-muted-foreground"}`}>
                  <Check className={`w-3.5 h-3.5 ${hasLetter ? "opacity-100" : "opacity-30"}`} />
                  Includes letters
                </span>
                <span className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-500 font-bold" : "text-muted-foreground"}`}>
                  <Check className={`w-3.5 h-3.5 ${hasNumber ? "opacity-100" : "opacity-30"}`} />
                  Includes number
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--theme-text-main)" }}
          >
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 opacity-50" style={{ color: "var(--theme-text-muted)" }} />
            </div>
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
              {...register("confirmPassword")}
              disabled={isPending}
              className="pl-10 pr-10 h-11 rounded-2xl border font-medium text-sm"
              style={{
                backgroundColor: "var(--theme-bg)",
                borderColor: errors.confirmPassword ? "red" : "var(--theme-border-subtle)",
                color: "var(--theme-text-main)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-muted-foreground hover:text-foreground"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div
          className="pt-4 flex items-center justify-end border-t"
          style={{ borderColor: "var(--theme-border-subtle)" }}
        >
          <Button
            type="submit"
            size="sm"
            disabled={isPending}
            className="w-full sm:w-auto rounded-xl font-bold text-xs cursor-pointer shadow-sm transition-all hover:brightness-95 active:scale-95 disabled:opacity-50"
            style={{
              backgroundColor: "var(--theme-btn-bg, #c8ff00)",
              color: "var(--theme-btn-text, #06110d)",
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5" />
                Update Password
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
