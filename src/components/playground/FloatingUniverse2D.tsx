"use client";

import { useEffect, useRef } from "react";

type Bubble = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  depth: number;
};

const COLORS = ["#65B8E8", "#F28DB5", "#24658F", "#9FD3F2", "#F6AECB", "#EAF5FC"];

/** 2D floating universe: bubbles drift at different speeds by depth,
 *  and are gently pushed by pointer or touch. */
export function FloatingUniverse2D({ height = 320 }: { height?: number }) {
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
    const pointer = { x: -9999, y: -9999, active: false };
    const bubbles: Bubble[] = Array.from({ length: 34 }, () => {
      const depth = 0.4 + Math.random() * 0.8;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (14 + Math.random() * 42) * devicePixelRatio * depth,
        vx: (Math.random() - 0.5) * 0.35 * devicePixelRatio * depth,
        vy: (Math.random() - 0.5) * 0.35 * devicePixelRatio * depth,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        depth,
      };
    });

    function setPointer(e: PointerEvent) {
      const r = el.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) * devicePixelRatio;
      pointer.y = (e.clientY - r.top) * devicePixelRatio;
      pointer.active = true;
    }
    function clearPointer() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }
    function onResize() {
      w = el.width = el.clientWidth * devicePixelRatio;
      h = el.height = height * devicePixelRatio;
    }

    function tick() {
      context.clearRect(0, 0, w, h);
      for (const b of bubbles) {
        b.x += b.vx;
        b.y += b.vy;
        if (pointer.active) {
          const dx = b.x - pointer.x;
          const dy = b.y - pointer.y;
          const d = Math.hypot(dx, dy);
          const R = 130 * devicePixelRatio;
          if (d < R && d > 0.01) {
            b.x += (dx / d) * 1.6 * devicePixelRatio * b.depth;
            b.y += (dy / d) * 1.6 * devicePixelRatio * b.depth;
          }
        }
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;

        context.globalAlpha = 0.38 + b.depth * 0.4;
        context.fillStyle = b.color;
        context.beginPath();
        context.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 0.5;
        context.fillStyle = "#FFFFFF";
        context.beginPath();
        context.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.22, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(tick);
    }

    el.addEventListener("pointermove", setPointer);
    el.addEventListener("pointerdown", setPointer);
    el.addEventListener("pointerleave", clearPointer);
    el.addEventListener("pointerup", clearPointer);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", setPointer);
      el.removeEventListener("pointerdown", setPointer);
      el.removeEventListener("pointerleave", clearPointer);
      el.removeEventListener("pointerup", clearPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [height]);

  return (
    <canvas
      ref={ref}
      style={{ height }}
      className="w-full touch-none rounded-2xl bg-gradient-to-br from-ice via-white to-soft"
      role="img"
      aria-label="Floating universe: translucent spheres drifting, move your pointer or finger to push them"
    />
  );
}
