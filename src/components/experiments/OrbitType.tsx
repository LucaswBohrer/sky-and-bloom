"use client";

import { useEffect, useRef, useState } from "react";

const WORD = "BLOOM".split("");

type Letter = { x: number; y: number; vx: number; vy: number };

/** Letters orbit the pointer: attracted to it, repelled by each other. */
export function OrbitType({ height = 220 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [letters, setLetters] = useState<Letter[]>(
    WORD.map((_, i) => ({ x: 50 + i * 26, y: 40 + (i % 2) * 18, vx: 0, vy: 0 })),
  );
  const mouse = useRef({ x: 50, y: 50 });

  useEffect(() => {
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function tick() {
      setLetters((prev) => {
        const next = prev.map((l) => ({ ...l }));
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
        return next;
      });
      if (!reduced) raf = requestAnimationFrame(tick);
    }
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
          aria-hidden="true"
          className="absolute font-display text-4xl font-bold text-deep select-none sm:text-5xl"
          style={{
            left: `${letters[i]?.x ?? 50}%`,
            top: `${letters[i]?.y ?? 50}%`,
            transform: "translate(-50%, -50%)",
            color: i % 2 === 0 ? "#24658F" : "#F28DB5",
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
