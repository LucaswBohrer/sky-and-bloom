"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { EXPERIMENTS, type Experiment } from "@/data/experiments";
import { PetalCanvas } from "@/components/experiments/PetalCanvas";
import { GradientLab } from "@/components/experiments/GradientLab";
import { OrbitType } from "@/components/experiments/OrbitType";
import { Reveal } from "@/components/ui/Reveal";

function Demo({ id, height }: { id: Experiment["id"]; height?: number }) {
  if (id === "petal-physics") return <PetalCanvas height={height} />;
  if (id === "chromatic-drift") return <GradientLab />;
  return <OrbitType height={height} />;
}

export function Experiments() {
  const [active, setActive] = useState<Experiment | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="experiments" aria-label="Experiments" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.3em] text-bloom uppercase">02 · Experiments</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-4xl leading-[1.05] font-bold text-deep sm:text-6xl">
              A collection of <span className="text-sky">living</span> experiments.
            </h2>
            <p className="max-w-sm text-ink/65">
              Three demonstrations, built by SKY &amp; BLOOM itself — not client
              work, not mockups. Each one runs right here. Open one and play.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIMENTS.map((exp, i) => (
            <Reveal
              key={exp.id}
              delay={i * 0.1}
              className={exp.tall ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : ""}
            >
              <article
                className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border border-ice bg-gradient-to-b from-white to-ice/60 p-5 shadow-[0_10px_40px_rgba(36,101,143,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(36,101,143,0.16)] ${
                  i === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-deep/40">{exp.index}</span>
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase"
                    style={{ background: exp.accent }}
                  >
                    {exp.category}
                  </span>
                </div>
                <div className="mt-5">
                  <Demo id={exp.id} height={exp.id === "petal-physics" ? 220 : 200} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-deep">{exp.name}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink/65">{exp.description}</p>
                <button
                  type="button"
                  onClick={() => setActive(exp)}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 font-semibold text-deep transition-colors hover:text-bloom"
                  aria-label={`Explore ${exp.name} in detail`}
                >
                  Explore the experiment
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-deep/40 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} — details`}
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold tracking-[0.25em] text-bloom uppercase">
                    {active.index} · {active.category}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-bold text-deep">{active.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close details"
                  className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-ice text-deep hover:bg-soft"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6">
                <Demo id={active.id} height={260} />
              </div>
              <p className="mt-6 leading-relaxed text-ink/75">{active.detail}</p>
              <p className="mt-4 font-editorial text-lg text-deep/70 italic">
                A demonstration created by SKY &amp; BLOOM — part of the lab, not a client project.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
