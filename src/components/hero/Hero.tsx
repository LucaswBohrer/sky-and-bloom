"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BloomFlower } from "@/components/effects/BloomFlower";

const FloatingUniverse3D = dynamic(
  () => import("@/components/effects/FloatingUniverse3D").then((m) => m.FloatingUniverse3D),
  { ssr: false, loading: () => <div aria-hidden="true" className="h-full w-full" /> },
);

const TITLE = ["A world", "of creativity."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh items-center overflow-hidden bg-gradient-to-b from-ice via-white to-soft pt-24 pb-16"
    >
      {/* soft background blobs */}
      <div aria-hidden="true" className="blob absolute -top-24 -left-24 size-[420px] bg-sky/25 blur-3xl" />
      <div aria-hidden="true" className="blob absolute top-1/3 -right-32 size-[460px] bg-bloom/20 blur-3xl" />
      <div aria-hidden="true" className="blob absolute bottom-0 left-1/3 size-[380px] bg-ice blur-3xl" />

      {/* 3D layer */}
      <motion.div
        style={{ y: yCanvas, opacity }}
        className="pointer-events-none absolute inset-0 hidden sm:block"
        aria-hidden="true"
      >
        <FloatingUniverse3D />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div style={{ y: yTitle, opacity }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky/40 bg-white/70 px-4 py-2 text-xs font-semibold tracking-widest text-deep uppercase"
          >
            <Sparkles className="size-3.5 text-bloom" aria-hidden="true" />
            An interactive creative lab
          </motion.p>

          <h1 className="font-display text-[clamp(2.9rem,8vw,6rem)] leading-[0.98] font-bold tracking-tight text-deep text-balance">
            {TITLE.map((line, li) => (
              <span key={line} className="block overflow-hidden pb-1">
                {line.split(" ").map((word, wi) => (
                  <motion.span
                    key={wi}
                    className={`mr-[0.28em] inline-block ${li === 1 && wi === 1 ? "text-bloom" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + li * 0.12 + wi * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 max-w-xl font-editorial text-2xl text-ink/75 italic sm:text-[1.7rem]"
          >
            Where imagination meets interaction.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-4 max-w-lg leading-relaxed text-ink/65"
          >
            SKY &amp; BLOOM is a living digital garden — floating shapes, blooming
            color and motion you can actually touch. Scroll, play, and make it yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#experiments"
              className="rounded-full bg-deep px-7 py-3.5 font-semibold text-white shadow-xl shadow-deep/30"
            >
              Explore the experiments
            </MagneticButton>
            <MagneticButton
              href="#playground"
              className="rounded-full border-2 border-bloom/60 bg-white/80 px-7 py-3.5 font-semibold text-deep"
            >
              Open the playground
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative mx-auto hidden w-full max-w-sm flex-col items-center lg:flex"
        >
          <div className="glass blob flex flex-col items-center px-8 py-10 text-center shadow-2xl shadow-sky/20">
            <BloomFlower size={220} interactive label="Bloom flower — click to open and close it" />
            <p className="mt-2 font-editorial text-xl text-deep italic">Click the bloom</p>
            <p className="mt-1 text-sm text-ink/60">
              One click opens it. Another closes it. That is the whole idea — small
              interactions, alive.
            </p>
          </div>
          <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-deep/50 uppercase">
            Bloom effect · 001
          </p>
        </motion.div>
      </div>

      <motion.a
        href="#experiments"
        aria-label="Scroll to the experiments"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex flex-col items-center gap-2 text-xs font-semibold tracking-[0.25em] text-deep/60 uppercase">
          Scroll
          <motion.span animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ArrowDown className="size-4" aria-hidden="true" />
          </motion.span>
        </span>
      </motion.a>
    </section>
  );
}
