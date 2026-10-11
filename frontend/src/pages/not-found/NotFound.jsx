import { Link } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto text-center py-28 px-4">
      <div className="h-16 w-16 mx-auto rounded-3xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-6">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="text-6xl font-black text-white">404</h1>
      <h2 className="text-xl font-bold text-slate-200 mt-2">Page Not Found</h2>
      <p className="text-slate-400 mt-2 text-sm">
        The destination you are trying to visit does not exist.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
        >
          <Home className="h-4 w-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}

export default NotFound
