import { Link, useLocation } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/planner', label: 'Trip Planner' },
]

export const Navbar = () => {
  const location = useLocation()

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundColor: 'var(--theme-surface)',
        borderBottom: '1px solid var(--theme-border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="h-11 w-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'var(--theme-primary-text)',
            }}
          >
            <Compass className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{ color: 'var(--theme-text-main)' }}
            >
              Wander<span style={{ color: 'var(--theme-primary)' }}>AI</span>
            </span>
            <span
              className="text-[11px] block font-bold -mt-1 tracking-widest uppercase opacity-75"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              Trip Planner
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
          {NAV_LINKS.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className="transition-all relative py-1 hover:opacity-100"
                style={{
                  color: isActive ? 'var(--theme-primary)' : 'var(--theme-text-muted)',
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side CTA */}
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-xl font-semibold">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            className="rounded-xl font-bold shadow-md cursor-pointer"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'var(--theme-primary-text)',
            }}
          >
            <Link to="/planner">Plan Trip</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
