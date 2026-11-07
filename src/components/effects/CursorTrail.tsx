"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
};

const COLORS = ["#65B8E8", "#F28DB5", "#24658F", "#9FD3F2", "#F6AECB"];

/** Lightweight cursor trail: soft dots that follow the pointer and fade.
 *  Disabled on touch devices and when reduced motion is preferred. */
export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const el: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    let raf = 0;
    let w = (el.width = window.innerWidth);
    let h = (el.height = window.innerHeight);
    const particles: Particle[] = [];
    let lastX = -1;
    let lastY = -1;

    function onMove(e: PointerEvent) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < 6 && lastX !== -1) return;
      lastX = e.clientX;
      lastY = e.clientY;
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 14,
          y: e.clientY + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.2,
          r: 3 + Math.random() * 6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0.55,
        });
      }
      if (particles.length > 90) particles.splice(0, particles.length - 90);
    }

    function onResize() {
      w = el.width = window.innerWidth;
      h = el.height = window.innerHeight;
    }

    function tick() {
      context.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.008;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        context.globalAlpha = p.alpha;
        context.fillStyle = p.color;
        context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
