import { Compass } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 py-10 text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Compass className="h-5 w-5 text-amber-400" />
          <span className="font-semibold text-white">Trip Planning & Recommendation System</span>
          <span>— 8th Semester Project</span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <span>React + Vite</span>
          <span>Tailwind CSS v4</span>
          <span className="text-slate-400">© 2026</span>
        </div>
      </div>
    </footer>
  )
}
