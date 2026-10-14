import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import Home from '../pages/home/Home';
import Login from '../pages/auth/login/Login';
import SignUp from '../pages/auth/signUp/SignUp';
import TripPlanner from '../pages/planner/TripPlanner';
import TripDetails from '../pages/planner/TripDetails';
import DashboardOverview from '../pages/dashboard/DashboardOverview';
import DashboardTrips from '../pages/dashboard/DashboardTrips';
import DashboardExplore from '../pages/dashboard/DashboardExplore';
import DashboardPreferences from '../pages/dashboard/DashboardPreferences';
import DashboardProfile from '../pages/dashboard/DashboardProfile';
import NotFound from '../pages/not-found/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Standalone Auth Routes (no layout) ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ── Public Routes with Navbar/Footer ── */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="planner" element={<TripPlanner />} />
        <Route path="planner/:id" element={<TripDetails />} />
      </Route>

      {/* ── Dashboard Routes (collapsible sidebar layout, no Navbar/Footer) ── */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="trips" element={<DashboardTrips />} />
        <Route path="explore" element={<DashboardExplore />} />
        <Route path="preferences" element={<DashboardPreferences />} />
        <Route path="profile" element={<DashboardProfile />} />
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
