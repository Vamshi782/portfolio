import { useCallback } from "react";

// Writes the cursor position into --sx/--sy so the .spotlight CSS can paint a
// border glow and soft fill that follow the mouse.
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: React.MouseEvent<T>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  }, []);
}
