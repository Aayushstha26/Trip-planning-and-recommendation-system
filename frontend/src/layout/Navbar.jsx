import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/explore", label: "Explore" },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout({
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to log out");
    },
  });

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundColor: "var(--theme-surface)",
        borderBottom: "1px solid var(--theme-border-subtle)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="h-11 w-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md"
            style={{
              backgroundColor: "var(--theme-primary)",
              color: "var(--theme-primary-text)",
            }}
          >
            <Compass className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{ color: "var(--theme-text-main)" }}
            >
              Wander<span style={{ color: "var(--theme-primary)" }}>AI</span>
            </span>
            <span
              className="text-[11px] block font-bold -mt-1 tracking-widest uppercase opacity-75"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Trip Planner
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
          {NAV_LINKS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="transition-all relative py-1 hover:opacity-100"
                style={{
                  color: isActive
                    ? "var(--theme-primary)"
                    : "var(--theme-text-muted)",
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: "var(--theme-primary)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                asChild
                className="rounded-xl font-bold shadow-md cursor-pointer transition-all hover:brightness-95 active:scale-95"
                style={{
                  backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                  color: "var(--theme-btn-text, #06110d)",
                }}
              >
                <Link to="/dashboard/planner">Plan Trip</Link>
              </Button>

              {/* Profile Link -> Leads directly to Dashboard */}
              <Link
                to="/dashboard"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all hover:opacity-90 active:scale-95 shadow-sm group"
                style={{
                  backgroundColor: "var(--theme-elevated)",
                  borderColor: "var(--theme-border)",
                }}
                title="Go to Dashboard"
              >
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs overflow-hidden shadow-xs transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: "var(--theme-primary)",
                    color: "var(--theme-primary-text)",
                  }}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{getInitials(user.name)}</span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span
                    className="text-xs font-bold leading-tight max-w-[120px] truncate"
                    style={{ color: "var(--theme-text-main)" }}
                  >
                    {user.name}
                  </span>
                  <span
                    className="text-[10px] font-medium leading-none"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    Dashboard
                  </span>
                </div>
              </Link>

              {/* Log out button */}
              <button
                type="button"
                onClick={() => logoutUser()}
                disabled={isLoggingOut}
                className="p-2 rounded-xl transition-all hover:opacity-100 opacity-70 hover:text-red-500 cursor-pointer"
                style={{ color: "var(--theme-text-muted)" }}
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Button
                asChild
                className="rounded-xl font-bold shadow-md cursor-pointer transition-all hover:brightness-95 active:scale-95"
                style={{
                  backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                  color: "var(--theme-btn-text, #06110d)",
                }}
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="rounded-xl font-bold shadow-md cursor-pointer transition-all hover:brightness-95 active:scale-95"
                style={{
                  backgroundColor: "var(--theme-btn-bg, #c8ff00)",
                  color: "var(--theme-btn-text, #06110d)",
                }}
              >
                <Link to="/login" state={{ from: "/dashboard/planner" }}>Plan Trip</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
