"use client";

import { useEffect, useRef } from "react";

export function useParallax(scrollFactor = 0.3, mouseFactor = 12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let mouseCX = 0;
    let mouseCY = 0;

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      mouseCX += (mouseX - mouseCX) * 0.06;
      mouseCY += (mouseY - mouseCY) * 0.06;
      const tx = mouseCX * mouseFactor;
      const ty = scrollY * scrollFactor + mouseCY * mouseFactor;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, [scrollFactor, mouseFactor]);

  return ref;
}
