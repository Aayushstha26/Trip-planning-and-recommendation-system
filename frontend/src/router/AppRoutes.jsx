import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import Home from '../pages/home/Home'
import Login from '../pages/auth/login/Login'
import SignUp from '../pages/auth/signUp/SignUp'
import NotFound from '../pages/not-found/NotFound'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone Auth Routes (without MainLayout header/footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Application Routes with MainLayout (Navbar, Content, Footer) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
