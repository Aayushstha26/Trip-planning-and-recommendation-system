import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Shield,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ProfileHeader,
  ProfileInfoForm,
  ChangePasswordForm,
  DeleteAccountModal,
} from "@/components/profile";

export default function DashboardProfile() {
  const [activeTab, setActiveTab] = useState("general");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Read user from Redux store & keep profile query synced
  const authUser = useAppSelector((state) => state.auth.user);
  const { data: userFromQuery, isLoading: isUserLoading } = useUserProfile();
  const user = userFromQuery || authUser;

  if (isUserLoading && !user) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6 animate-pulse">
        <Skeleton className="h-44 w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-64 md:col-span-3 rounded-3xl" />
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "General Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 transition-colors">
      {/* Breadcrumb & Title */}
      <div>
        <div
          className="flex items-center gap-2 text-xs font-medium mb-2"
          style={{ color: "var(--theme-text-muted)" }}
        >
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "var(--theme-text-main)" }} className="font-semibold">
            Profile & Settings
          </span>
        </div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          style={{ color: "var(--theme-text-main)" }}
        >
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--theme-text-muted)" }}>
          Manage your personal details, credentials, and account settings.
        </p>
      </div>

      {/* Main Profile Header Hero */}
      <ProfileHeader user={user} />

      {/* Sidebar Navigation Layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-60 lg:w-64 shrink-0 space-y-4">
          <div
            className="rounded-3xl border p-2 shadow-xs"
            style={{
              backgroundColor: "var(--theme-surface-solid)",
              borderColor: "var(--theme-border-subtle)",
            }}
          >
            <p
              className="px-3 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Settings
            </p>
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isDanger = tab.id === "danger";

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer text-left shrink-0 md:shrink ${
                      isActive
                        ? isDanger
                          ? "bg-red-500/15 text-red-600 dark:text-red-400 font-semibold border border-red-500/20"
                          : "font-semibold shadow-xs"
                        : isDanger
                        ? "text-red-500 hover:bg-red-500/10 font-medium"
                        : "hover:opacity-80 font-medium"
                    }`}
                    style={{
                      backgroundColor:
                        isActive && !isDanger
                          ? "var(--theme-elevated)"
                          : !isActive
                          ? "transparent"
                          : undefined,
                      color:
                        isActive && !isDanger
                          ? "var(--theme-primary)"
                          : !isActive && !isDanger
                          ? "var(--theme-text-muted)"
                          : undefined,
                    }}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isDanger
                          ? "text-red-500"
                          : isActive
                          ? "opacity-100"
                          : "opacity-60"
                      }`}
                    />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Helpful Info Card */}
          <div
            className="hidden md:block rounded-3xl border p-4 shadow-xs"
            style={{
              backgroundColor: "var(--theme-surface-solid)",
              borderColor: "var(--theme-border-subtle)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles
                className="w-3.5 h-3.5"
                style={{ color: "var(--theme-border-highlight)" }}
              />
              <span className="text-xs font-bold" style={{ color: "var(--theme-text-main)" }}>
                Quick Tip
              </span>
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--theme-text-muted)" }}>
              Click directly on your avatar photo above to upload or update your picture anytime.
            </p>
          </div>
        </aside>

        {/* Content Panel on the right */}
        <main className="flex-1 min-w-0 w-full space-y-6">
          {activeTab === "general" && <ProfileInfoForm user={user} />}

          {activeTab === "security" && (
            <div className="space-y-6">
              <ChangePasswordForm />

              <div
                className="rounded-3xl border p-6 shadow-xs"
                style={{
                  backgroundColor: "var(--theme-surface-solid)",
                  borderColor: "var(--theme-border-subtle)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: "var(--theme-elevated)",
                      color: "var(--theme-text-main)",
                    }}
                  >
                    <Shield className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: "var(--theme-text-main)" }}>
                    Security Recommendations
                  </h3>
                </div>
                <ul
                  className="text-xs space-y-2 leading-relaxed"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>Choose a strong password with at least 8 characters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>Never share your password or auth credentials with others.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "danger" && (
            <div
              className="rounded-3xl border border-red-500/20 p-6 sm:p-8 shadow-xs"
              style={{
                backgroundColor: "var(--theme-surface-solid)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
                    Danger Zone
                  </h2>
                  <p className="text-xs sm:text-sm" style={{ color: "var(--theme-text-muted)" }}>
                    Permanent and irreversible account operations.
                  </p>
                </div>
              </div>

              <div
                className="p-5 rounded-2xl border border-red-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6"
                style={{ backgroundColor: "var(--theme-elevated)" }}
              >
                <div>
                  <h4 className="text-sm font-bold text-red-600 dark:text-red-400">
                    Delete This Account
                  </h4>
                  <p
                    className="text-xs mt-0.5 max-w-lg"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    Once you delete your account, all your account data, credentials, and settings
                    will be permanently removed.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="rounded-xl font-bold text-xs shrink-0 cursor-pointer shadow-sm transition-all active:scale-95 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete Account Modal Dialog */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userId={user?.id}
        userEmail={user?.email}
      />
    </div>
  );
}
