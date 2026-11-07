"use client";

import { useEffect, useRef } from "react";

const WORD = "BLOOM".split("");

type Letter = { x: number; y: number; vx: number; vy: number };

/**
 * Letters orbit the pointer: attracted to it, repelled by each other.
 * Rendered with direct DOM transforms inside rAF — no React re-renders
 * per frame, so the animation stays at 60fps without wasted work.
 */
export function OrbitType({ height = 220 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouse = useRef({ x: 50, y: 50 });
  const letters = useRef<Letter[]>(
    WORD.map((_, i) => ({ x: 50 + i * 9 - 18, y: 42 + (i % 2) * 14, vx: 0, vy: 0 })),
  );

  useEffect(() => {
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function apply() {
      letters.current.forEach((l, i) => {
        const el = letterRefs.current[i];
        if (!el) return;
        el.style.left = `${l.x}%`;
        el.style.top = `${l.y}%`;
        const speed = Math.min(1.35, 1 + Math.hypot(l.vx, l.vy) * 0.12);
        el.style.transform = `translate(-50%, -50%) scale(${speed.toFixed(3)}) rotate(${(l.vx * 8).toFixed(1)}deg)`;
      });
    }

    function tick() {
      const next = letters.current;
      for (let i = 0; i < next.length; i++) {
        const l = next[i];
        const dx = mouse.current.x - l.x;
        const dy = mouse.current.y - l.y;
        const d = Math.hypot(dx, dy) || 1;
        l.vx += (dx / d) * 0.12;
        l.vy += (dy / d) * 0.12;
        for (let j = 0; j < next.length; j++) {
          if (i === j) continue;
          const o = next[j];
          const rx = l.x - o.x;
          const ry = l.y - o.y;
          const rd = Math.hypot(rx, ry) || 1;
          if (rd < 16) {
            l.vx += (rx / rd) * 0.35;
            l.vy += (ry / rd) * 0.35;
          }
        }
        l.vx *= 0.94;
        l.vy *= 0.94;
        l.x += l.vx;
        l.y += l.vy;
        l.x = Math.max(4, Math.min(96, l.x));
        l.y = Math.max(8, Math.min(88, l.y));
      }
      apply();
      if (!reduced) raf = requestAnimationFrame(tick);
    }

    apply();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onMove(e: React.PointerEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouse.current = {
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    };
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      style={{ height }}
      className="relative w-full touch-none overflow-hidden rounded-2xl bg-gradient-to-br from-white to-ice"
      role="img"
      aria-label="Interactive typography: the letters of BLOOM orbit your pointer"
    >
      {WORD.map((ch, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="absolute font-display text-5xl font-bold select-none sm:text-6xl"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: i % 2 === 0 ? "#24658F" : "#F28DB5",
            willChange: "transform, left, top",
          }}
        >
          {ch}
        </span>
      ))}
      <span className="sr-only">BLOOM — move your pointer to make the letters orbit</span>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-widest text-deep/50 uppercase">
        Move your pointer here
      </span>
    </div>
  );
}
