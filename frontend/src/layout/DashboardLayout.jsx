import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Bell, Search, Plus, Home } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout() {

  return (
    <SidebarProvider defaultOpen={true}>
      <div
        className="flex min-h-screen w-full overflow-hidden"
        style={{ background: 'var(--theme-bg)', color: 'var(--theme-text-main)' }}
      >
        {/* ── Shadcn Sidebar (desktop + mobile drawer) ── */}
        <DashboardSidebar />

        {/* ── Main Area ── */}
        <SidebarInset className="flex flex-col flex-1 min-w-0 overflow-hidden bg-transparent">
          {/* ── Top Nav Bar ── */}
          <header
            className="flex items-center justify-between h-14 px-4 shrink-0 border-b"
            style={{
              background: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)',
            }}
          >
            {/* Left: Sidebar Trigger */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="cursor-pointer hover:opacity-75" />
            </div>

            {/* Right: Search, New Trip, Bell, Avatar */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Search */}
              <button
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border cursor-pointer transition-all hover:opacity-80"
                style={{
                  background: 'var(--theme-elevated)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-muted)',
                }}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search…</span>
              </button>

              {/* New Trip CTA */}
              <NavLink
                to="/planner"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:brightness-95"
                style={{ background: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)' }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Trip</span>
              </NavLink>

              {/* Bell */}
              <button
                className="relative p-2 rounded-xl transition-all hover:opacity-80 cursor-pointer"
                style={{ background: 'var(--theme-elevated)', color: 'var(--theme-text-muted)' }}
              >
                <Bell className="w-4 h-4" />
                <span
                  className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--theme-primary)' }}
                />
              </button>

              {/* Home */}
              <NavLink
                to="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all hover:opacity-80"
                style={{
                  background: 'var(--theme-elevated)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-main)',
                }}
                title="Go to Home"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </NavLink>
            </div>
          </header>

          {/* ── Page Content ── */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
