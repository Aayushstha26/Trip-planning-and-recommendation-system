import React from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Users,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";

const adminNavItems = [
  {
    id: "admin-overview",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
    end: true,
  },
  {
    id: "admin-destinations",
    label: "Destinations",
    icon: MapPin,
    path: "/admin/destinations",
    end: false,
  },
  {
    id: "admin-users",
    label: "Users",
    icon: Users,
    path: "/admin/users",
    end: false,
  },
];

export default function AdminLayout() {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout({
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: (err) => toast.error(err?.message || "Failed to logout"),
  });

  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className="flex min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "var(--theme-bg, #0d1117)", color: "var(--theme-text-main, #ffffff)" }}
    >
      {/* ── Admin Dedicated Sidebar ── */}
      <aside
        className="w-64 shrink-0 flex flex-col border-r transition-all duration-300"
        style={{
          backgroundColor: "var(--theme-surface, #161b22)",
          borderColor: "var(--theme-border, #30363d)",
        }}
      >
        {/* Brand Header */}
        <div
          className="h-16 px-5 flex items-center justify-between border-b"
          style={{ borderColor: "var(--theme-border, #30363d)" }}
        >
          <Link to="/admin" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-md"
              style={{
                backgroundColor: "var(--theme-primary, #c8ff00)",
                color: "var(--theme-primary-text, #06110d)",
              }}
            >
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight block leading-tight">
                Wander<span style={{ color: "var(--theme-primary, #c8ff00)" }}>AI</span>
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider block"
                style={{ color: "var(--theme-primary, #c8ff00)" }}
              >
                Admin Control
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div
            className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider opacity-60"
            style={{ color: "var(--theme-text-muted, #8b949e)" }}
          >
            Management
          </div>

          {adminNavItems.map(({ id, label, icon: Icon, path, end }) => {
            const isActive = end
              ? location.pathname === path
              : location.pathname.startsWith(path);

            return (
              <NavLink
                key={id}
                to={path}
                end={end}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{
                  backgroundColor: isActive
                    ? "var(--theme-elevated, #21262d)"
                    : "transparent",
                  color: isActive
                    ? "var(--theme-primary, #c8ff00)"
                    : "var(--theme-text-muted, #8b949e)",
                }}
              >
                <Icon
                  className="w-4 h-4 shrink-0"
                  style={{
                    color: isActive
                      ? "var(--theme-primary, #c8ff00)"
                      : "var(--theme-text-muted, #8b949e)",
                  }}
                />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Section: Admin User & Logout */}
        <div
          className="p-3 border-t space-y-2"
          style={{ borderColor: "var(--theme-border, #30363d)" }}
        >
          {/* Admin User Card */}
          {user && (
            <div
              className="flex items-center justify-between p-2 rounded-xl"
              style={{ backgroundColor: "var(--theme-elevated, #21262d)" }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden"
                  style={{
                    backgroundColor: "var(--theme-primary, #c8ff00)",
                    color: "var(--theme-primary-text, #06110d)",
                  }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate leading-tight" style={{ color: "var(--theme-text-main, #ffffff)" }}>
                    {user.name || "Administrator"}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: "var(--theme-text-muted, #8b949e)" }}>
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => logoutUser()}
                disabled={isLoggingOut}
                className="p-1.5 rounded-lg hover:opacity-75 cursor-pointer transition-opacity"
                style={{ color: "var(--theme-text-muted, #8b949e)" }}
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Admin Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header
          className="h-16 px-6 flex items-center justify-between border-b shrink-0"
          style={{
            backgroundColor: "var(--theme-surface, #161b22)",
            borderColor: "var(--theme-border, #30363d)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "rgba(200, 255, 0, 0.15)",
                color: "var(--theme-primary, #c8ff00)",
              }}
            >
              Admin Environment
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

