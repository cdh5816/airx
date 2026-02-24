/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

"use client";

import React, { useEffect } from "react";
import { OREXLogo } from "@/components/brand/Logo";
import { IconButton } from "@/components/ui/IconButton";
import { useNotifications } from "@/lib/hooks/useNotifications";

function SvgStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5l2.7 5.7 6.3.9-4.5 4.4 1.1 6.2L12 17.9 6.4 20.7l1.1-6.2L3 10.1l6.3-.9L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SvgSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M16.5 16.5L21 21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SvgBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 20a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SvgLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 7V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-1"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M15 12H3m0 0 3-3m-3 3 3 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TopBar({
  companyName,
  onOpenFavorites,
  onOpenSearch,
  onOpenNotifications,
  onLogout,
}: {
  companyName?: string;
  onOpenFavorites?: () => void;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onLogout?: () => void;
}) {
  const { unreadCount } = useNotifications();

  // Ctrl/⌘+K → Search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        onOpenSearch?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-[var(--line)]">
      <div
        className="mx-auto max-w-6xl flex items-center justify-between h-14"
        style={{
          paddingLeft: "var(--pad-x)",
          paddingRight: "var(--pad-x)",
        }}
      >
        <div className="flex items-center gap-3">
          <OREXLogo />
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-gray-900 leading-4">
              {companyName ?? "OREX"}
            </div>
            <div className="text-xs text-[var(--muted)] leading-4">
              Organized Real-time EXecution
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <IconButton label="즐겨찾기" onClick={onOpenFavorites}>
            <SvgStar />
          </IconButton>
          <IconButton label="검색" onClick={onOpenSearch}>
            <SvgSearch />
          </IconButton>
          <IconButton
            label="알림"
            onClick={onOpenNotifications}
            badgeDot={unreadCount > 0}
          >
            <SvgBell />
          </IconButton>
          <div className="w-px h-6 bg-[var(--line)] mx-2" />
          <IconButton label="로그아웃" onClick={onLogout}>
            <SvgLogout />
          </IconButton>
        </nav>
      </div>
    </header>
  );
}
