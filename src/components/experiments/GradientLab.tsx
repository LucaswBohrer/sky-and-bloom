"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Live gradient lab: hue + softness sliders, with a copyable CSS snippet. */
export function GradientLab() {
  const [hue, setHue] = useState(12);
  const [soft, setSoft] = useState(55);
  const [copied, setCopied] = useState(false);

  const css = useMemo(
    () =>
      `background: linear-gradient(${135 + hue}deg, #65B8E8 0%, #F28DB5 ${soft}%, #24658F 100%);`,
    [hue, soft],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="h-36 w-full rounded-2xl shadow-inner transition-all duration-200 sm:h-44"
        style={{ background: `linear-gradient(${135 + hue}deg, #65B8E8 0%, #F28DB5 ${soft}%, #24658F 100%)` }}
        role="img"
        aria-label="Live gradient preview built from the SKY and BLOOM palette"
      />
      <div className="space-y-3">
        <label className="block text-sm font-medium text-deep">
          <span className="flex justify-between">
            <span>Hue drift</span>
            <span className="text-ink/60">{hue}°</span>
          </span>
          <input
            type="range"
            min={-40}
            max={80}
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="mt-1 w-full accent-[#F28DB5]"
            aria-label="Hue drift"
          />
        </label>
        <label className="block text-sm font-medium text-deep">
          <span className="flex justify-between">
            <span>Bloom position</span>
            <span className="text-ink/60">{soft}%</span>
          </span>
          <input
            type="range"
            min={10}
            max={90}
            value={soft}
            onChange={(e) => setSoft(Number(e.target.value))}
            className="mt-1 w-full accent-[#65B8E8]"
            aria-label="Bloom position in the gradient"
          />
        </label>
      </div>
      <div className="flex items-center gap-2">
        <code className="min-w-0 flex-1 truncate rounded-lg bg-ice px-3 py-2 font-mono text-[11px] text-deep">
          {css}
        </code>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-deep px-4 py-2 text-xs font-semibold text-white"
          aria-label="Copy gradient CSS"
        >
          {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          {copied ? "Copied" : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}
