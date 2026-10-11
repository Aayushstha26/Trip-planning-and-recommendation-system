import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Explore from '../pages/explore/Explore'
import Planner from '../pages/planner/Planner'
import NotFound from '../pages/not-found/NotFound'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone Auth Routes (without MainLayout header/footer) */}
      <Route path="/login" element={<Login />} />

      {/* Application Routes with MainLayout (Navbar, Content, Footer) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="planner" element={<Planner />} />
      </Route>

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
