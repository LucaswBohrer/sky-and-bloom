"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

/** Consistent section header: numbered eyebrow, display title, optional lede. */
export function SectionHeading({ index, eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      <p className={`text-xs font-bold tracking-[0.3em] text-bloom uppercase ${centered ? "" : ""}`}>
        {index} · {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-4xl leading-[1.04] font-bold tracking-tight text-deep text-balance sm:text-6xl ${
          centered ? "mx-auto max-w-3xl" : "max-w-2xl"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 max-w-xl leading-relaxed text-ink/65 ${centered ? "mx-auto" : ""}`}>{description}</p>
      )}
    </Reveal>
  );
}
