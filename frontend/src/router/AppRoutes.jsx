import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useCurrentUser } from "@/hooks/useAuth";
import { MainLayout } from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/signUp/SignUp";
import TripPlanner from "../pages/planner/TripPlanner";
import TripDetails from "../pages/planner/TripDetails";
import DashboardOverview from "../pages/dashboard/DashboardOverview";
import DashboardTrips from "../pages/dashboard/DashboardTrips";
import DashboardExplore from "../pages/dashboard/DashboardExplore";
import DashboardPreferences from "../pages/dashboard/DashboardPreferences";
import DashboardProfile from "../pages/dashboard/DashboardProfile";
import NotFound from "../pages/not-found/NotFound";

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
          <Route index element={<DashboardOverview />} />
          <Route path="trips" element={<DashboardTrips />} />
          <Route path="planner" element={<TripPlanner />} />
          <Route path="planner/:id" element={<TripDetails />} />
          <Route path="explore" element={<DashboardExplore />} />
          <Route path="preferences" element={<DashboardPreferences />} />
          <Route path="profile" element={<DashboardProfile />} />
        </Route>
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
