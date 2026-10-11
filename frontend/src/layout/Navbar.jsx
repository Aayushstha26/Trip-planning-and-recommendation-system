import { Link, useLocation } from 'react-router-dom'
import { Compass } from 'lucide-react'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/planner', label: 'Trip Planner' },
]

export const Navbar = () => {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 group-hover:scale-105 transition-transform">
            <Compass className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
              WanderAI
            </span>
            <span className="text-xs block text-slate-400 font-medium -mt-1 tracking-wider uppercase">
              Trip Planner
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors hover:text-white ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/planner"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20 active:scale-95"
          >
            Plan Trip
          </Link>
        </div>
      </div>
    </header>
  )
}
