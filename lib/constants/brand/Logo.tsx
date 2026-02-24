/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

import React from "react";
import { BRAND } from "@/lib/constants/branding";

type Props = {
  className?: string;
  compact?: boolean;
};

export function OREXLogo({ className, compact }: Props) {
  // SVG 워드마크: O는 코발트, 나머지는 다크그레이
  return (
    <div className={className} aria-label="OREX">
      <div className="flex items-baseline gap-2">
        <svg
          width={compact ? 76 : 96}
          height="24"
          viewBox="0 0 120 24"
          role="img"
          aria-label="OREX logo"
        >
          {/* O */}
          <path
            d="M12 2.5c5.6 0 9.5 3.6 9.5 9.5S17.6 21.5 12 21.5 2.5 17.9 2.5 12 6.4 2.5 12 2.5Zm0 3.2c-3.7 0-6.2 2.4-6.2 6.3 0 3.9 2.5 6.3 6.2 6.3 3.7 0 6.2-2.4 6.2-6.3 0-3.9-2.5-6.3-6.2-6.3Z"
            fill={BRAND.primary}
          />
          {/* R */}
          <path
            d="M34 4h8.7c4.2 0 6.9 2.2 6.9 6 0 2.7-1.3 4.6-3.6 5.5l4.1 6.5h-4.2l-3.6-5.9H38v5.9h-4V4Zm8.5 9c2 0 3.1-1 3.1-2.8 0-1.8-1.1-2.8-3.1-2.8H38v5.6h4.5Z"
            fill="#111827"
          />
          {/* E */}
          <path
            d="M55.3 4h14.8v3.3H59.3v4.3h10v3.2h-10v4.4h10.8V22H55.3V4Z"
            fill="#111827"
          />
          {/* X */}
          <path
            d="M74.3 4h4.6l4.3 6.6L87.6 4h4.6l-6.6 9.6 7 8.4H88l-4.8-6.1-4.8 6.1h-4.6l7-8.4-6.5-9.6Z"
            fill="#111827"
          />
        </svg>

        {!compact && (
          <span className="text-xs text-[var(--muted)] hidden sm:inline">
            {BRAND.tagline}
          </span>
        )}
      </div>
    </div>
  );
}
