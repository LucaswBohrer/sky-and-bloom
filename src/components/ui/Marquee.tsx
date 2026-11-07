"use client";

const WORDS = ["Sky", "Bloom", "Motion", "Color", "Play", "Imagine", "Create", "Float"];

/** Editorial marquee strip between hero and experiments.
 *  Pure CSS animation; pauses when reduced motion is preferred. */
export function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-deep/10 bg-white py-4 select-none"
    >
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-xl font-bold tracking-wide sm:text-2xl ${
                i % 2 === 0 ? "text-deep" : "font-editorial font-medium text-bloom italic"
              }`}
            >
              {w}
            </span>
            <span className="size-2 rounded-full bg-sky" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
