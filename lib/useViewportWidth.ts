"use client";

import { useEffect, useState } from "react";

/**
 * Viewport width, scrollbar excluded — the width a full-bleed block has to hit.
 * 0 until the first client measurement, which is the signal to keep rendering
 * the plain CSS layout instead of a stale inline width.
 */
export function useViewportWidth() {
  const [vw, setVw] = useState(0);

  useEffect(() => {
    const sync = () => setVw(document.documentElement.clientWidth);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return vw;
}

export default useViewportWidth;
