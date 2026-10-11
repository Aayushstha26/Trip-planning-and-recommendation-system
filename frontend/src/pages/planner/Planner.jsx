import { useState } from 'react'
import { Sparkles, Clock } from 'lucide-react'

export const Planner = () => {
  const [destination, setDestination] = useState('Pokhara')
  const [days, setDays] = useState(3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="h-4 w-4" /> Smart Customizer
          </div>
          <h1 className="text-3xl font-extrabold text-white">Smart Itinerary Planner</h1>
          <p className="text-slate-400 text-sm mt-1">Configure parameters and generate customized trip days</p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md shadow-amber-400/20 transition-all cursor-pointer">
          Save Itinerary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-slate-800/40 p-5 rounded-3xl border border-slate-700/50">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Destination
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Duration
          </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium cursor-pointer"
          >
            <option value={2}>2 Days Weekend</option>
            <option value={3}>3 Days Standard</option>
            <option value={5}>5 Days Extended</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-3xl">
        <h3 className="text-lg font-bold text-white mb-4">Sample Schedule for {destination} ({days} Days)</h3>
        <div className="space-y-4">
          {[
            { day: 'Day 1', time: '09:00 AM', title: 'Arrival, Hotel Check-in & Scenic Lake Walk' },
            { day: 'Day 2', time: '05:30 AM', title: 'Sunrise Mountain Viewpoint & Paragliding' },
            { day: 'Day 3', time: '10:00 AM', title: 'Local Cultural Heritage Sites & Thakali Cuisine' },
          ].slice(0, days).map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-700/40 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 mr-2">{item.day}</span>
                <span className="text-sm font-semibold text-white">{item.title}</span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Planner
