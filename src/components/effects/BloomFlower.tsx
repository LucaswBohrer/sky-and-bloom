"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type BloomFlowerProps = {
  size?: number;
  /** 0 = closed bud, 1 = fully open */
  open?: number;
  interactive?: boolean;
  className?: string;
  label?: string;
};

const PETALS = [
  { rotate: 0, fill: "#F28DB5" },
  { rotate: 45, fill: "#F6AECB" },
  { rotate: 90, fill: "#F28DB5" },
  { rotate: 135, fill: "#F6AECB" },
  { rotate: 180, fill: "#F28DB5" },
  { rotate: 225, fill: "#F6AECB" },
  { rotate: 270, fill: "#F28DB5" },
  { rotate: 315, fill: "#F6AECB" },
];

/**
 * The Bloom Effect: an SVG flower that opens petal by petal.
 * `open` can be driven by scroll, by a slider, or by click (interactive).
 */
export function BloomFlower({
  size = 240,
  open = 1,
  interactive = false,
  className = "",
  label = "Bloom flower — click to open and close",
}: BloomFlowerProps) {
  const reduce = useReducedMotion();
  const [clicked, setClicked] = useState(true);
  const amount = interactive ? (clicked ? 1 : 0.12) : open;
  const t = reduce ? 1 : amount;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={interactive ? clicked : undefined}
      onClick={interactive ? () => setClicked((v) => !v) : undefined}
      className={`${interactive ? "cursor-pointer" : "cursor-default"} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        role="img"
        aria-hidden="true"
      >
        <g transform="translate(100 100)">
          {PETALS.map((p, i) => (
            <motion.g
              key={i}
              animate={{
                rotate: p.rotate,
                scale: 0.35 + t * 0.65,
                opacity: 0.55 + t * 0.45,
              }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <ellipse cx="0" cy="-42" rx="17" ry="40" fill={p.fill} />
            </motion.g>
          ))}
          <motion.circle
            r={16}
            fill="#65B8E8"
            animate={{ scale: 0.6 + t * 0.4 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: "0px 0px" }}
          />
          <circle r={7} fill="#24658F" />
        </g>
      </svg>
      {interactive && (
        <span className="sr-only">Toggle the bloom animation</span>
      )}
    </button>
  );
}
