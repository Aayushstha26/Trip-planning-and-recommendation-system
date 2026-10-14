import React from 'react';

export default function DashboardProfile() {
  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--theme-text-main)' }}>Profile</h1>
      <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>Your profile and account settings will appear here.</p>
    </div>
  );
}
