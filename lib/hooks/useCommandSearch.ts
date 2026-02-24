/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

import { useMemo, useState } from "react";

export type SearchResult = { id: string; title: string; subtitle?: string; href: string };

export function useCommandSearch(results: SearchResult[]) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return results;
    return results.filter((r) => (r.title + " " + (r.subtitle ?? "")).toLowerCase().includes(q));
  }, [query, results]);

  return { open, setOpen, query, setQuery, filtered };
}
