import { Link } from 'react-router-dom'
import { Sparkles, MapPin, Calendar, Search, ArrowRight } from 'lucide-react'

export const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-indigo-500/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            AI-Powered Personalized Travel Planning
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Design Your Next Adventure with{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Smart Recommendations
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Personalized itineraries, accurate budget planning, and destination matching tailored to your unique travel style.
          </p>

          {/* Quick Search / Planner Trigger */}
          <div className="mt-10 max-w-3xl mx-auto bg-slate-800/60 backdrop-blur-xl border border-slate-700/60 p-3 sm:p-4 rounded-3xl shadow-2xl shadow-black/40">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="bg-slate-900/60 border border-slate-700/40 p-3 rounded-2xl flex items-center gap-3">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Destination</div>
                  <input
                    type="text"
                    placeholder="Where to? (e.g. Pokhara)"
                    className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full font-medium"
                  />
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-700/40 p-3 rounded-2xl flex items-center gap-3">
                <Calendar className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Duration</div>
                  <select className="bg-transparent text-sm text-white focus:outline-none w-full font-medium cursor-pointer">
                    <option value="weekend" className="bg-slate-800">2-3 Days Weekend</option>
                    <option value="week" className="bg-slate-800">1 Week Getaway</option>
                    <option value="twoweeks" className="bg-slate-800">2 Weeks Tour</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <Link
                  to="/planner"
                  className="w-full h-full min-h-[50px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Search className="h-4 w-4" />
                  <span>Start Planning</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              to="/explore"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-all"
            >
              Explore Destinations →
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-300 border border-slate-700/60 font-medium transition-all"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
