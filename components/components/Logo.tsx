// © AIRX (individual business). All rights reserved.
import React from 'react';

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect width="64" height="64" rx="8" fill="#1B3FAE" />
        <text x="50%" y="54%" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="28" fill="#fff">L9</text>
      </svg>
      <span style={{ color: '#333333', fontWeight: 700, letterSpacing: 0.5 }}>LOOKUP9</span>
    </div>
  );
}

export default Logo;
