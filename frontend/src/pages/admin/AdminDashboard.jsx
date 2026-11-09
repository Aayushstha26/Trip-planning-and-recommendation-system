import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, ShieldCheck, Compass } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
          style={{
            backgroundColor: "rgba(200, 255, 0, 0.15)",
            color: "var(--theme-primary, #c8ff00)",
          }}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Admin Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--theme-text-main)" }}>
          Admin Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--theme-text-muted)" }}>
          Manage platform destinations, review travel data, and oversee user activity.
        </p>
      </div>

      {/* Admin Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Destinations Card */}
        <div
          className="p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between"
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-border)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "var(--theme-elevated)",
                color: "var(--theme-primary)",
              }}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: "var(--theme-text-main)" }}>
                Destinations Management
              </h2>
              <p className="text-xs mt-1" style={{ color: "var(--theme-text-muted)" }}>
                Add new travel spots, update budgets, seasonal tags, difficulty, and coordinates.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t flex justify-end" style={{ borderColor: "var(--theme-border-subtle)" }}>
            <Link
              to="/admin/destinations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
              style={{
                backgroundColor: "var(--theme-btn-bg)",
                color: "var(--theme-btn-text)",
              }}
            >
              <Compass className="w-3.5 h-3.5" />
              Manage Destinations
            </Link>
          </div>
        </div>

        {/* Users Management Card */}
        <div
          className="p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between"
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-border)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "var(--theme-elevated)",
                color: "var(--theme-primary)",
              }}
            >
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: "var(--theme-text-main)" }}>
                User Accounts
              </h2>
              <p className="text-xs mt-1" style={{ color: "var(--theme-text-muted)" }}>
                View registered users and monitor account roles across WanderAI.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t flex justify-end" style={{ borderColor: "var(--theme-border-subtle)" }}>
            <Link
              to="/admin/users"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
              style={{
                backgroundColor: "var(--theme-elevated)",
                color: "var(--theme-text-main)",
                border: "1px solid var(--theme-border)",
              }}
            >
              <Users className="w-3.5 h-3.5" />
              View Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

