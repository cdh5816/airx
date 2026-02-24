/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

import React from "react";

export function IconButton({
  label,
  onClick,
  children,
  badgeDot,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  badgeDot?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="
        relative inline-flex items-center justify-center
        h-9 w-9 rounded-xl
        text-gray-600 hover:text-[#1B3FAE]
        hover:bg-white/70
        active:bg-white
        transition
      "
    >
      {children}
      {badgeDot && (
        <span aria-hidden="true" className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#1B3FAE]" />
      )}
    </button>
  );
}
