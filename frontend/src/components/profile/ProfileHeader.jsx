import { useRef } from "react";
import {
  Camera,
  Trash2,
  Calendar,
  Mail,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateAvatar, useRemoveAvatar } from "@/hooks/useUserProfile";

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
};

export const ProfileHeader = ({ user }) => {
  const fileInputRef = useRef(null);

  const { mutate: updateAvatar, isPending: isUploading } = useUpdateAvatar({
    onSuccess: () => {
      toast.success("Profile photo updated successfully!");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update profile photo");
    },
  });

  const { mutate: removeAvatar, isPending: isRemoving } = useRemoveAvatar({
    onSuccess: () => {
      toast.success("Profile photo removed");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to remove photo");
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WEBP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size must be less than 5MB");
      return;
    }

    updateAvatar(file);
    e.target.value = "";
  };

  const isPending = isUploading || isRemoving;

  return (
    <div
      className="rounded-3xl border p-5 sm:p-6 shadow-xs transition-all"
      style={{
        backgroundColor: "var(--theme-surface-solid)",
        borderColor: "var(--theme-border-subtle)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-5">
        {/* Left Side: Avatar + Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">
          {/* Avatar with Camera Overlay */}
          <div className="relative group shrink-0">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-0.5 shadow-md flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105"
              style={{
                backgroundColor: "var(--theme-surface-solid)",
                border: "2px solid var(--theme-border-subtle)",
              }}
            >
              <div
                className="w-full h-full rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl overflow-hidden relative"
                style={{
                  backgroundColor: "var(--theme-primary)",
                  color: "var(--theme-primary-text)",
                }}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User Avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(user?.name)
                )}

                {isPending && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-xs">
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Upload Button on Avatar Corner */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
              aria-label="Upload photo"
              className="absolute -bottom-1 -right-1 p-1.5 rounded-xl shadow-md cursor-pointer transition-all hover:brightness-95 active:scale-95 disabled:opacity-50"
              style={{
                backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                color: "var(--theme-btn-text, #06110d)",
                border: "2px solid var(--theme-surface-solid)",
              }}
              title="Change profile photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* User Details */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2
                className="text-xl sm:text-2xl font-extrabold tracking-tight"
                style={{ color: "var(--theme-text-main)" }}
              >
                {user?.name || "Traveler"}
              </h2>
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: "var(--theme-elevated)",
                  color: "var(--theme-text-main)",
                }}
              >
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                {user?.role || "USER"}
              </span>
            </div>

            <div
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 text-xs font-medium"
              style={{ color: "var(--theme-text-muted)" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 opacity-70" />
                {user?.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 opacity-70" />
                Joined {formatDate(user?.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Actions & Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
            className="rounded-xl font-bold text-xs cursor-pointer shadow-sm transition-all hover:brightness-95 active:scale-95 disabled:opacity-50"
            style={{
              backgroundColor: "var(--theme-btn-bg, #c8ff00)",
              color: "var(--theme-btn-text, #06110d)",
            }}
          >
            <Camera className="w-3.5 h-3.5 mr-1.5" />
            Upload Photo
          </Button>

          {user?.avatar && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeAvatar()}
              disabled={isPending}
              className="rounded-xl font-bold text-xs cursor-pointer hover:text-red-500 hover:border-red-300 transition-all active:scale-95"
              title="Remove custom photo and use initials avatar"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1 text-red-500" />
              Remove
            </Button>
          )}

          <span
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ml-1"
            style={{
              backgroundColor: "var(--theme-elevated)",
              borderColor: "var(--theme-border-subtle)",
              color: "var(--theme-text-main)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
