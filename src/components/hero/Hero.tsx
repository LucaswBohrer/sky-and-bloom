"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Sparkles } from "lucide-react";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BloomFlower } from "@/components/effects/BloomFlower";
import { DUR, EASE } from "@/animations/motion";

const FloatingUniverse3D = dynamic(
  () => import("@/components/effects/FloatingUniverse3D").then((m) => m.FloatingUniverse3D),
  { ssr: false, loading: () => <div aria-hidden="true" className="h-full w-full" /> },
);

const STATS = [
  { value: "03", label: "live experiments" },
  { value: "04", label: "playground stations" },
  { value: "07", label: "colors in the palette" },
] as const;

/** Hero 2.0 — cinematic, centered, full-bleed 3D.
 *  One giant typographic moment over a living sky, with the bloom as a
 *  small invitation at the edge instead of a competing card. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleCanvas = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ice via-white to-soft pt-28 pb-20"
    >
      {/* soft background blobs */}
      <div aria-hidden="true" className="blob absolute -top-24 -left-24 size-[420px] bg-sky/25 blur-3xl" />
      <div aria-hidden="true" className="blob absolute top-1/3 -right-32 size-[460px] bg-bloom/20 blur-3xl" />
      <div aria-hidden="true" className="blob absolute bottom-0 left-1/3 size-[380px] bg-ice blur-3xl" />

      {/* 3D layer — full bleed on every screen, parallax on scroll */}
      <motion.div
        style={{ y: yCanvas, opacity, scale: scaleCanvas }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <FloatingUniverse3D />
      </motion.div>

      {/* soft veil behind the title: guarantees contrast no matter where
          the 3D orbs drift, without hiding the sky around the words */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-[5] h-[560px] w-[900px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-3xl"
      />

      {/* floating bloom — the first thing you can touch */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: EASE }}
        className="absolute right-[5%] bottom-[14%] z-10 hidden xl:block"
        aria-hidden="false"
      >
        <div className="flex flex-col items-center">
          <BloomFlower size={205} interactive label="Bloom flower — click to open and close it" />
          <span className="mt-1 text-[11px] font-semibold tracking-[0.25em] text-deep/50 uppercase">
            Click the bloom
          </span>
        </div>
      </motion.div>

      <motion.div style={{ y: yTitle, opacity }} className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, ease: EASE }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky/40 bg-white/70 px-4 py-2 text-xs font-semibold tracking-widest text-deep uppercase backdrop-blur"
        >
          <Sparkles className="size-3.5 text-bloom" aria-hidden="true" />
          An interactive creative lab
        </motion.p>

        <h1 className="font-display text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.92] font-bold tracking-[-0.03em] text-deep text-balance">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            >
              A world
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-3">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
            >
              <span className="font-editorial font-medium italic">of&nbsp;</span>
              <span className="text-gradient">creativity.</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, delay: 0.55, ease: EASE }}
          className="mx-auto mt-6 max-w-xl font-editorial text-2xl text-ink/75 italic sm:text-[1.7rem]"
        >
          Where imagination meets interaction.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, delay: 0.65, ease: EASE }}
          className="mx-auto mt-4 max-w-lg leading-relaxed text-ink/65"
        >
          SKY &amp; BLOOM is a living digital garden — floating shapes, blooming
          color and motion you can actually touch. Scroll, play, and make it yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, delay: 0.8, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href="#experiments"
            className="rounded-full bg-deep px-7 py-3.5 font-semibold text-white shadow-xl shadow-deep/30"
          >
            Explore the experiments
          </MagneticButton>
          <MagneticButton
            href="#playground"
            className="rounded-full border-2 border-bloom/60 bg-white/80 px-7 py-3.5 font-semibold text-deep backdrop-blur"
          >
            Open the playground
          </MagneticButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.slow, delay: 1 }}
          className="mx-auto mt-12 flex max-w-md items-stretch justify-center gap-6 sm:gap-10"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <dt className="order-2 text-[11px] font-semibold tracking-[0.18em] text-deep/55 uppercase">
                {s.label}
              </dt>
              <dd className="order-1 font-display text-2xl font-bold text-deep">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* scroll cue — a thin line with a travelling dot */}
      <motion.a
        href="#experiments"
        aria-label="Scroll to the experiments"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex flex-col items-center gap-2.5 text-[11px] font-semibold tracking-[0.3em] text-deep/55 uppercase">
          Scroll to bloom
          <span className="relative h-10 w-px overflow-hidden bg-deep/20" aria-hidden="true">
            <motion.span
              className="absolute top-0 left-0 h-3 w-px bg-bloom"
              animate={reduce ? undefined : { y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
            />
          </span>
        </span>
      </motion.a>
    </section>
  );
}
