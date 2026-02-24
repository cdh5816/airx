/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

import React from "react";

type Props = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  badgeDot?: boolean;
};

export function IconButton({ label, onClick, children, badgeDot }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="
        relative inline-flex items-center justify-center
        h-9 w-9 rounded-xl
        text-gray-600 hover:text-[var(--cobalt-500)]
        hover:bg-white/70
        active:bg-white
        transition
      "
    >
      {children}
      {badgeDot && (
        <span
          aria-hidden="true"
          className="
            absolute top-2 right-2
            h-2 w-2 rounded-full
            bg-[var(--cobalt-500)]
          "
        />
      )}
    </button>
  );
}
