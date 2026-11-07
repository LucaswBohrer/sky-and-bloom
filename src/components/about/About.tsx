"use client";

import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { BloomFlower } from "@/components/effects/BloomFlower";
import { PALETTE } from "@/lib/site";
import { Palette, MousePointerClick, Sparkles } from "lucide-react";

const PILLARS = [
  {
    icon: Palette,
    title: "Color as language",
    text: "Sky blue for air and possibility, bloom pink for warmth and surprise. Every shade in the palette earns its place — nothing is decoration for its own sake.",
  },
  {
    icon: MousePointerClick,
    title: "Interaction as meaning",
    text: "A page that ignores you is a poster. SKY & BLOOM only feels alive when you touch it — every experiment answers back, in real time.",
  },
  {
    icon: Sparkles,
    title: "Motion with manners",
    text: "Movement guides the eye, never shouts at it. Effects have hierarchy: a few expressive moments, the rest quiet and deliberate — and everything rests when you ask it to.",
  },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [bloomOpen, setBloomOpen] = useState(0.08);
  const flowerScale = useTransform(scrollYProgress, [0.1, 0.7], [0.9, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.15) / 0.6));
    setBloomOpen(0.08 + t * 0.92);
  });

  return (
    <section id="about" ref={ref} aria-label="About SKY and BLOOM" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative order-2 lg:order-1">
            <div className="blob mx-auto flex max-w-md flex-col items-center bg-ice px-8 py-8 text-center">
              <motion.div style={{ scale: flowerScale }}>
                <BloomFlower size={300} open={bloomOpen} label="Bloom flower opening as you scroll" />
              </motion.div>
              <p className="mt-1 font-editorial text-2xl text-deep italic">
                It blooms as you scroll.
              </p>
              <p className="mt-1 text-sm text-ink/60">
                This flower is tied to your scroll position — the page itself is the gardener.
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.3em] text-bloom uppercase">04 · Behind the bloom</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] font-bold text-deep sm:text-5xl">
                A lab where technology learns to be <span className="font-editorial font-medium text-bloom italic">gentle.</span>
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
                SKY &amp; BLOOM began with a simple question: what if a website felt
                less like a document and more like a place? A place with air in it,
                with light, with things that drift and bloom when you arrive.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
                It is an experimental laboratory of digital creativity — no clients, no
                briefs, no invented case studies. Just motion, color, typography and
                code, explored in public, one experiment at a time.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ice text-deep">
                      <p.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-deep">{p.title}</h3>
                      <p className="mt-1 max-w-lg leading-relaxed text-ink/65">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.25em] text-deep/50 uppercase">
                  The palette — nothing else enters the garden
                </p>
                <div className="mt-3 flex overflow-hidden rounded-2xl shadow-lg shadow-deep/10" role="list" aria-label="SKY and BLOOM color palette">
                  {PALETTE.map((c) => (
                    <div
                      key={c.hex}
                      role="listitem"
                      className="group relative h-16 flex-1 transition-all duration-300 hover:flex-[1.8]"
                      style={{ background: c.hex }}
                      title={`${c.name} — ${c.hex} · ${c.role}`}
                    >
                      <span className="absolute inset-x-0 bottom-1 hidden text-center font-mono text-[9px] font-bold text-deep/70 group-hover:block">
                        {c.hex}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-ink/50">
                  Hover a stripe to reveal its hex — white ~50%, blues ~35%, pinks ~15%.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
