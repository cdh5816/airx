/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

import { useMemo, useState } from "react";

export type NotificationItem = {
  id: string;
  title: string;
  createdAt: string; // ISO
  unread: boolean;
  href?: string;
};

export function useNotifications() {
  // Phase 1: mock. Phase 2: DB/API로 교체
  const [items, setItems] = useState<NotificationItem[]>([
    {
      id: "n1",
      title: "문서 업로드: 평촌도서관 현장",
      createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      unread: true,
      href: "/dashboard",
    },
    {
      id: "n2",
      title: "요청 등록: MTW 근로자지원시설",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      unread: false,
      href: "/dashboard",
    },
  ]);

  const unreadCount = useMemo(() => items.filter((x) => x.unread).length, [items]);

  const markAllRead = () => setItems((prev) => prev.map((x) => ({ ...x, unread: false })));
  const markRead = (id: string) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, unread: false } : x)));

  return { items, unreadCount, markAllRead, markRead };
}
