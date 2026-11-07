"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  strength?: number;
};

/** Button that is gently pulled toward the cursor. Falls back to a plain
 *  button on touch devices / reduced motion. */
export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  ariaLabel,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className={`inline-flex items-center justify-center gap-2 ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className="inline-block"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block cursor-pointer"
    >
      {inner}
    </button>
  );
}
