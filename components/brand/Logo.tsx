/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

import React from "react";

export function OREXLogo({ className }: { className?: string }) {
  return (
    <div className={className} aria-label="OREX">
      <div className="flex items-baseline gap-2">
        <span className="text-[18px] font-bold tracking-tight">
          <span style={{ color: "#1B3FAE" }}>O</span>
          <span className="text-gray-900">REX</span>
        </span>
        <span className="text-xs text-gray-500 hidden sm:inline">Organized Real-time EXecution</span>
      </div>
    </div>
  );
}
