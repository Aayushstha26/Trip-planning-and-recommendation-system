import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const MainLayout = () => {
  return (
    <div 
      className="min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 pb-20 sm:pb-24 selection:bg-[var(--theme-primary)] selection:text-[var(--theme-primary-text)]"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text-main)',
      }}
    >
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
