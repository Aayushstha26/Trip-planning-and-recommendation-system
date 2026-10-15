import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Map,
  CalendarDays,
  Compass,
  Sparkles,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const navItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  { id: "trips", label: "My Trips", icon: Map, path: "/dashboard/trips" },
  {
    id: "planner",
    label: "Planner",
    icon: CalendarDays,
    path: "/dashboard/planner",
  },
  {
    id: "explore",
    label: "Explore",
    icon: Compass,
    path: "/dashboard/explore",
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: Sparkles,
    path: "/dashboard/preferences",
  },
  { id: "profile", label: "Profile", icon: User, path: "/dashboard/profile" },
];

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function DashboardSidebar() {
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout({
    onSuccess: () => {
      toast.success("Logged out");
      navigate("/login");
    },
    onError: (err) => toast.error(err?.message || "Logout failed"),
  });

  const isItemActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      {/* ── Brand / Header ── */}
      <SidebarHeader className="p-0">
        <div className="flex items-center h-14 px-3 border-b border-sidebar-border shrink-0 gap-2.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <button
            onClick={isCollapsed ? toggleSidebar : undefined}
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 cursor-pointer transition-transform hover:scale-105"
            style={{
              background: "var(--theme-btn-bg)",
              color: "var(--theme-btn-text)",
            }}
            title={isCollapsed ? "Expand sidebar" : "TravelAI"}
          >
            ✈
          </button>
          {!isCollapsed && (
            <span
              className="font-bold text-sm tracking-tight truncate flex-1"
              style={{ color: "var(--theme-text-main)" }}
            >
              TravelAI
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:opacity-70 cursor-pointer transition-opacity group-data-[collapsible=icon]:hidden"
            style={{ color: "var(--theme-text-muted)" }}
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </SidebarHeader>

      {/* ── Plan New Trip CTA ── */}
      <div className="px-3 pt-3 pb-1 group-data-[collapsible=icon]:px-2">
        <NavLink
          to="/dashboard/planner"
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl font-semibold text-sm transition-all hover:brightness-95 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          style={{
            background: "var(--theme-btn-bg)",
            color: "var(--theme-btn-text)",
          }}
          title={isCollapsed ? "Plan New Trip" : undefined}
        >
          <Plus className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="truncate">Plan New Trip</span>}
        </NavLink>
      </div>

      {/* ── Navigation Items ── */}
      <SidebarContent className="px-3 py-1 group-data-[collapsible=icon]:px-2">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {navItems.map(({ id, label, icon: Icon, path }) => {
                const active = isItemActive(path);
                return (
                  <SidebarMenuItem key={id}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={label}
                    >
                      <NavLink to={path} end={path === "/dashboard"}>
                        <Icon className="w-[18px] h-[18px] shrink-0" />
                        <span>{label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── User Profile & Logout Footer ── */}
      <SidebarFooter className="border-t border-sidebar-border p-3 group-data-[collapsible=icon]:p-2 space-y-2 shrink-0">
        {user && (
          <div
            className="flex items-center gap-2.5 p-2 rounded-xl overflow-hidden group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1.5"
            style={{ background: "var(--theme-elevated)" }}
            title={isCollapsed ? `${user.name} (${user.email})` : undefined}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden"
              style={{
                background: "var(--theme-primary)",
                color: "var(--theme-primary-text)",
              }}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(user.name)
              )}
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--theme-text-main)" }}
                >
                  {user.name}
                </p>
                <p
                  className="text-xs truncate opacity-60"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {user.email}
                </p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => logoutUser()}
          disabled={isLoggingOut}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          style={{
            color: "var(--theme-text-muted)",
          }}
          title={isCollapsed ? "Log Out" : undefined}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!isCollapsed && (
            <span className="truncate">
              {isLoggingOut ? "Logging out…" : "Log Out"}
            </span>
          )}
        </button>
      </SidebarFooter>

      {/* ── Shadcn Resize/Hover Rail ── */}
      <SidebarRail />
    </Sidebar>
  );
}
