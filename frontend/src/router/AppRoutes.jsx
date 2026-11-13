import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useCurrentUser } from "@/hooks/useAuth";
import { MainLayout } from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Overview from "../pages/dashboard/overview/Overview";
import Planner from "../pages/dashboard/planner/Planner";
import TripDetails from "../pages/dashboard/planner/TripDetails";
import Explore from "../pages/dashboard/explore/Explore";
import Profile from "../pages/dashboard/profile/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminDestinations from "../pages/admin/destinations/AdminDestinations";
import NotFound from "../pages/NotFound";

const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--theme-bg, #0d1117)",
          color: "var(--theme-text-main, #ffffff)",
        }}
      >
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--theme-primary, #c8ff00)" }}
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

const AdminRoute = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--theme-bg, #0d1117)",
          color: "var(--theme-text-main, #ffffff)",
        }}
      >
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--theme-primary, #c8ff00)" }}
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Standalone Auth Routes (no layout) ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ── Public Routes with Navbar/Footer ── */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* ── Dashboard Routes (protected, collapsible sidebar layout) ── */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="trips" element={<Navigate to="/dashboard/planner" replace />} />
          <Route path="planner" element={<Planner />} />
          <Route path="planner/:id" element={<TripDetails />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* ── Admin Routes (protected, restricted to role === ADMIN) ── */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="destinations" element={<AdminDestinations />} />
        </Route>
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
