/* ============================================================================
 * OREX (Organized Real-time EXecution)
 * Copyright (c) AIRX (개인사업자). All rights reserved.
 * ========================================================================== */

import { useCallback } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

const STORAGE_KEY = "orex:favorites:v1";

export function useFavorites() {
  const [ids, setIds] = useLocalStorage<string[]>(STORAGE_KEY, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const toggleFavorite = useCallback(
    (id: string) => {
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
    },
    [setIds]
  );

  return { favoriteIds: ids, isFavorite, toggleFavorite };
}
