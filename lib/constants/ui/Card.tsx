/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

import React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        "bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow-sm)]",
        "border border-gray-100",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={["px-5 pt-5", className ?? ""].join(" ")}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={["px-5 pb-5", className ?? ""].join(" ")}>{children}</div>;
}
