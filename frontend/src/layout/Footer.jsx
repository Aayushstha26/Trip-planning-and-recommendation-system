import { Compass } from 'lucide-react'

export const Footer = () => {
  return (
    <footer
      className="mt-20 border-t py-10 text-sm transition-colors duration-300"
      style={{
        backgroundColor: 'var(--theme-surface-solid)',
        borderColor: 'var(--theme-border-subtle)',
        color: 'var(--theme-text-muted)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5" style={{ color: 'var(--theme-primary)' }} />
          <span className="font-bold" style={{ color: 'var(--theme-text-main)' }}>
            Trip Planning & Recommendation System
          </span>
          <span>— 8th Semester Project</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-medium">
          <span>React + Vite</span>
          <span>Tailwind CSS</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
