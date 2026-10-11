import { Link } from 'react-router-dom'
import { Compass, Search, MapPin } from 'lucide-react'

export const Explore = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Compass className="h-4 w-4" /> Destinations Catalog
          </div>
          <h1 className="text-3xl font-extrabold text-white">Explore Destinations</h1>
          <p className="text-slate-400 text-sm mt-1">Discover places and recommended trips</p>
        </div>

        <div className="relative min-w-[280px]">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search destination..."
            className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Pokhara Valley', country: 'Nepal', tag: 'Adventure', budget: '$350' },
          { title: 'Kathmandu Cultural Trail', country: 'Nepal', tag: 'Cultural', budget: '$200' },
          { title: 'Chitwan Safari', country: 'Nepal', tag: 'Wildlife', budget: '$300' },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-3xl hover:border-amber-400/40 transition-all">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">{item.tag}</div>
            <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
              <MapPin className="h-3.5 w-3.5 text-amber-400" /> {item.country}
            </p>
            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-sm font-bold text-amber-300">From {item.budget}</span>
              <Link to="/planner" className="text-xs font-semibold text-slate-300 hover:text-white">
                View Plan →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore
