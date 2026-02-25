// © AIRX (individual business). All rights reserved.
import React from 'react';
import Logo from '@/components/Logo';

export default function TopBar({ companyName, isSuper }: { companyName?: string; isSuper?: boolean }) {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3">
            <Logo />
          </a>
          <button className="text-sm text-gray-700 font-medium" onClick={() => (window.location.href = '/')}>
            {companyName || 'LOOKUP9'}
          </button>
          {isSuper && (
            <div className="ml-4">
              <select className="border rounded px-2 py-1 text-sm">
                <option>Company A</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a href="/favorites" className="text-gray-600">⭐</a>
          <button className="text-gray-600">🔍</button>
          <div className="relative">
            <button className="text-gray-600">🔔</button>
          </div>
          <div>
            <a href="/account" className="text-gray-600">Profile</a>
          </div>
        </div>
      </div>
    </header>
  );
}
