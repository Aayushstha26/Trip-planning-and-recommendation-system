import React from 'react';

export default function Overview() {
  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--theme-text-main)' }}>Overview</h1>
      <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>Your dashboard overview will appear here.</p>
    </div>
  );
}
