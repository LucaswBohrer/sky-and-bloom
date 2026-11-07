"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  angle: number;
  spin: number;
  speed: number;
  sway: number;
  color: string;
};

const COLORS = ["#F28DB5", "#F6AECB", "#65B8E8", "#9FD3F2", "#FFFFFF"];

/** Petals drift down on a soft wind; the pointer gently pushes them away. */
export function PetalCanvas({ height = 260 }: { height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const el: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = (el.width = el.clientWidth * devicePixelRatio);
    let h = (el.height = height * devicePixelRatio);
    const mouse = { x: -9999, y: -9999 };
    const petals: Petal[] = Array.from({ length: 34 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: (5 + Math.random() * 9) * devicePixelRatio,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      speed: (0.3 + Math.random() * 0.7) * devicePixelRatio,
      sway: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    function onMove(e: PointerEvent) {
      const r = el.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * devicePixelRatio;
      mouse.y = (e.clientY - r.top) * devicePixelRatio;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onResize() {
      w = el.width = el.clientWidth * devicePixelRatio;
      h = el.height = height * devicePixelRatio;
    }

    function tick(t: number) {
      context.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.speed;
        p.sway += 0.01;
        p.x += Math.sin(p.sway) * 0.4 * devicePixelRatio;
        p.angle += p.spin;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        const R = 90 * devicePixelRatio;
        if (d < R && d > 0.01) {
          p.x += (dx / d) * 2.2 * devicePixelRatio;
          p.y += (dy / d) * 2.2 * devicePixelRatio;
        }
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }
        context.save();
        context.translate(p.x, p.y);
        context.rotate(p.angle);
        context.fillStyle = p.color;
        context.globalAlpha = 0.85;
        context.beginPath();
        context.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
      context.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(tick);
      void t;
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [height]);

  return (
    <canvas
      ref={ref}
      style={{ height }}
      className="w-full touch-none rounded-2xl bg-gradient-to-br from-ice to-soft"
      role="img"
      aria-label="Interactive canvas: petals drifting, move your pointer to push them"
    />
  );
}
