"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, RotateCcw, Shuffle } from "lucide-react";
import { PALETTE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BloomFlower } from "@/components/effects/BloomFlower";
import { FloatingUniverse2D } from "@/components/playground/FloatingUniverse2D";

const COLOR_PRESETS = [
  { name: "Sky Morning", bg: "#EAF5FC", accent: "#65B8E8", text: "#24658F" },
  { name: "Bloom Dusk", bg: "#FBE5EF", accent: "#F28DB5", text: "#243747" },
  { name: "Deep Night", bg: "#24658F", accent: "#F28DB5", text: "#FFFFFF" },
] as const;

const SHAPE_COLORS = ["#65B8E8", "#F28DB5", "#24658F", "#F6AECB", "#9FD3F2"];
const SHAPES = [
  { id: "circle", label: "Circle", radius: "50%" },
  { id: "blob", label: "Blob", radius: "58% 42% 55% 45% / 48% 55% 45% 52%" },
  { id: "square", label: "Square", radius: "18%" },
  { id: "pill", label: "Petal", radius: "50% 50% 50% 50% / 70% 70% 30% 30%" },
] as const;

type ShapeState = { color: number; scale: number; rotate: number };

const DEFAULT_SHAPES: ShapeState[] = SHAPES.map(() => ({ color: 0, scale: 1, rotate: 0 }));
const DEFAULT_COLOR = { bg: "#EAF5FC", accent: "#65B8E8", text: "#24658F" };

export function Playground() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [shapes, setShapes] = useState<ShapeState[]>(DEFAULT_SHAPES);
  const [bloom, setBloom] = useState(0.85);
  const [copied, setCopied] = useState<string | null>(null);

  const comboCss = useMemo(
    () => `background: ${color.bg};\ncolor: ${color.text};\n--accent: ${color.accent};`,
    [color],
  );

  function resetAll() {
    setColor(DEFAULT_COLOR);
    setShapes(DEFAULT_SHAPES);
    setBloom(0.85);
  }

  function cycleShape(i: number) {
    setShapes((prev) =>
      prev.map((s, j) =>
        j === i
          ? { color: (s.color + 1) % SHAPE_COLORS.length, scale: s.scale >= 1.25 ? 0.85 : +(s.scale + 0.15).toFixed(2), rotate: s.rotate + 45 }
          : s,
      ),
    );
  }

  function shuffleShapes() {
    setShapes(SHAPES.map(() => ({
      color: Math.floor(Math.random() * SHAPE_COLORS.length),
      scale: 0.85 + Math.random() * 0.5,
      rotate: Math.floor(Math.random() * 8) * 45,
    })));
  }

  async function copyHex(hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable — the hex is visible next to the swatch */
    }
  }

  return (
    <section id="playground" aria-label="Playground" className="relative overflow-hidden bg-ice py-24 sm:py-32">
      <div aria-hidden="true" className="blob absolute -top-20 right-0 size-[380px] bg-bloom/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            eyebrow="Playground"
            title={
              <>
                Play with <span className="font-editorial font-medium text-bloom italic">imagination.</span>
              </>
            }
            description="Nothing here is decorative. Every control changes something real — colors, shapes, motion. Try it, break it, then put it back."
          />
          <Reveal delay={0.15}>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-deep shadow-lg shadow-deep/10 transition-transform hover:scale-[1.03]"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Reset everything
            </button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* A — Color Playground */}
          <Reveal>
            <article className="flex h-full flex-col rounded-[2rem] bg-white p-6 shadow-[0_10px_40px_rgba(36,101,143,0.08)] sm:p-8">
              <span className="text-xs font-bold tracking-[0.25em] text-sky uppercase">A · Color Playground</span>
              <h3 className="mt-3 font-display text-2xl font-bold text-deep">Mix the palette</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Pick a background, an accent and a text color from the official palette.
                The preview updates instantly.
              </p>

              <div
                className="mt-6 rounded-3xl p-6 transition-colors duration-300 sm:p-8"
                style={{ background: color.bg, color: color.text }}
              >
                <p className="font-editorial text-2xl italic sm:text-3xl">“Color is the first word of this garden.”</p>
                <p className="mt-3 text-sm opacity-75">Live preview — your combination, right now.</p>
                <span
                  className="mt-5 inline-block rounded-full px-4 py-2 text-xs font-bold tracking-widest text-white uppercase"
                  style={{ background: color.accent }}
                >
                  Accent in action
                </span>
                <pre className="mt-5 overflow-x-auto rounded-xl bg-white/70 p-3 font-mono text-[11px] text-deep">{comboCss}</pre>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Color combination presets">
                  {COLOR_PRESETS.map((p) => {
                    const isActive = color.bg === p.bg && color.accent === p.accent && color.text === p.text;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setColor({ bg: p.bg, accent: p.accent, text: p.text })}
                        aria-pressed={isActive}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                          isActive ? "bg-deep text-white" : "bg-ice text-deep hover:bg-soft"
                        }`}
                      >
                        <span className="flex -space-x-1" aria-hidden="true">
                          {[p.bg, p.accent, p.text].map((c) => (
                            <span key={c} className="size-3 rounded-full border border-white shadow-sm" style={{ background: c }} />
                          ))}
                        </span>
                        {p.name}
                      </button>
                    );
                  })}
                </div>
                {(["bg", "accent", "text"] as const).map((role) => (
                  <div key={role}>
                    <p className="mb-2 text-xs font-bold tracking-widest text-deep/60 uppercase">
                      {role === "bg" ? "Background" : role === "accent" ? "Accent" : "Text"}
                    </p>
                    <div className="flex flex-wrap gap-2" role="group" aria-label={`Choose ${role} color`}>
                      {PALETTE.filter((p) => p.hex !== "#FFFFFF" || role === "bg").map((p) => (
                        <button
                          key={p.hex}
                          type="button"
                          onClick={() => setColor((c) => ({ ...c, [role]: p.hex }))}
                          aria-pressed={color[role] === p.hex}
                          aria-label={`${role} color ${p.name} ${p.hex}`}
                          title={`${p.name} — ${p.hex}`}
                          className={`size-10 cursor-pointer rounded-full border-2 transition-transform hover:scale-110 ${
                            color[role] === p.hex ? "border-deep ring-2 ring-deep/30" : "border-white shadow"
                          }`}
                          style={{ background: p.hex }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {PALETTE.map((p) => (
                  <button
                    key={p.hex}
                    type="button"
                    onClick={() => copyHex(p.hex)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-ice px-3 py-1.5 font-mono text-[11px] font-semibold text-deep hover:bg-soft"
                    aria-label={`Copy hex code ${p.hex}`}
                  >
                    {copied === p.hex ? <Check className="size-3" aria-hidden="true" /> : <Copy className="size-3" aria-hidden="true" />}
                    {p.hex}
                  </button>
                ))}
              </div>
            </article>
          </Reveal>

          {/* B — Floating Universe */}
          <Reveal delay={0.1}>
            <article className="flex h-full flex-col rounded-[2rem] bg-white p-6 shadow-[0_10px_40px_rgba(36,101,143,0.08)] sm:p-8">
              <span className="text-xs font-bold tracking-[0.25em] text-sky uppercase">B · Floating Universe</span>
              <h3 className="mt-3 font-display text-2xl font-bold text-deep">A sky you can push</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Spheres drift at different speeds — deeper ones move slower. Move your
                pointer or finger through them and they part around you.
              </p>
              <div className="mt-6 flex-1">
                <FloatingUniverse2D height={340} />
              </div>
              <p className="mt-4 text-center text-xs font-semibold tracking-widest text-deep/50 uppercase">
                Tip · sweep your pointer — or finger — through the spheres
              </p>
            </article>
          </Reveal>

          {/* C — Interactive Shapes */}
          <Reveal>
            <article className="flex h-full flex-col rounded-[2rem] bg-white p-6 shadow-[0_10px_40px_rgba(36,101,143,0.08)] sm:p-8">
              <span className="text-xs font-bold tracking-[0.25em] text-sky uppercase">C · Interactive Shapes</span>
              <h3 className="mt-3 font-display text-2xl font-bold text-deep">Tap a shape, change it</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Each tap cycles color, grows the shape and turns it 45°. Shuffle
                randomizes the whole set at once.
              </p>
              <div className="mt-8 grid flex-1 grid-cols-2 place-items-center gap-6 sm:grid-cols-4">
                {SHAPES.map((shape, i) => (
                  <button
                    key={shape.id}
                    type="button"
                    onClick={() => cycleShape(i)}
                    aria-label={`${shape.label} shape — tap to change color, size and rotation`}
                    className="group flex cursor-pointer flex-col items-center gap-3"
                  >
                    <motion.span
                      animate={{
                        scale: shapes[i].scale,
                        rotate: shapes[i].rotate,
                        backgroundColor: SHAPE_COLORS[shapes[i].color],
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="block size-24 shadow-lg shadow-deep/15 sm:size-28"
                      style={{ borderRadius: shape.radius }}
                    />
                    <span className="text-xs font-bold tracking-widest text-deep/60 uppercase">{shape.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-6 text-center text-xs font-semibold tracking-widest text-deep/50 uppercase">
                Tip · tap the same shape again and again — it grows, turns, then shrinks back
              </p>
              <button
                type="button"
                onClick={shuffleShapes}
                className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-deep px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <Shuffle className="size-4" aria-hidden="true" />
                Shuffle all shapes
              </button>
            </article>
          </Reveal>

          {/* D — Bloom Effect */}
          <Reveal delay={0.1}>
            <article className="flex h-full flex-col items-center rounded-[2rem] bg-gradient-to-br from-soft via-white to-ice p-6 text-center shadow-[0_10px_40px_rgba(36,101,143,0.08)] sm:p-8">
              <span className="text-xs font-bold tracking-[0.25em] text-bloom uppercase">D · Bloom Effect</span>
              <h3 className="mt-3 font-display text-2xl font-bold text-deep">Watch it bloom</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/65">
                The signature of SKY &amp; BLOOM. Drag the slider and the petals open one by one.
              </p>
              <div className="mt-4">
                <BloomFlower size={230} open={bloom} label="Bloom flower opening with the slider" />
              </div>
              <label className="mt-2 w-full max-w-xs text-sm font-medium text-deep">
                <span className="flex justify-between">
                  <span>Bloom amount</span>
                  <span className="text-ink/60">{Math.round(bloom * 100)}%</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(bloom * 100)}
                  onChange={(e) => setBloom(Number(e.target.value) / 100)}
                  className="mt-1 w-full accent-[#F28DB5]"
                  aria-label="Bloom amount"
                />
              </label>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
