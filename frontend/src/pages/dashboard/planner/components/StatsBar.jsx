import { Plane, ShieldCheck, Users, MapPin } from "lucide-react";

function StatCard({ icon: Icon, value, label }) {
  return (
    <div
      className="p-4 rounded-2xl border flex items-center gap-4 transition-all"
      style={{
        backgroundColor: "var(--theme-surface-solid)",
        borderColor: "var(--theme-border)",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{
          backgroundColor: "var(--theme-elevated)",
          color: "var(--theme-border-highlight)",
        }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div
          className="text-2xl font-black"
          style={{ color: "var(--theme-text-main)" }}
        >
          {value}
        </div>
        <div
          className="text-xs font-semibold"
          style={{ color: "var(--theme-text-muted)" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export function StatsBar({ stats }) {
  return (
    <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Plane} value={stats.total} label="Total Trips" />
      <StatCard icon={ShieldCheck} value={stats.organizing} label="Created by You" />
      <StatCard icon={Users} value={stats.joined} label="Joined as Member" />
      <StatCard icon={MapPin} value={stats.withDestination} label="Destinations Locked" />
    </div>
  );
}
