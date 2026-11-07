export type ExperimentId = "petal-physics" | "chromatic-drift" | "orbit-type";

export type Experiment = {
  id: ExperimentId;
  index: string;
  name: string;
  category: string;
  description: string;
  detail: string;
  accent: string;
  tall?: boolean;
};

export const EXPERIMENTS: Experiment[] = [
  {
    id: "petal-physics",
    index: "01",
    name: "Petal Physics",
    category: "Canvas · Motion",
    description:
      "A field of petals drifting on invisible wind. Move your pointer through them and watch the field bend around you.",
    detail:
      "Each petal is simulated on a 2D canvas: gravity, sway and a gentle repulsion from the pointer. No two runs look the same, because the wind is seeded from the moment you open it. It is a study in soft physics — motion that feels organic instead of scripted.",
    accent: "#F28DB5",
  },
  {
    id: "chromatic-drift",
    index: "02",
    name: "Chromatic Drift",
    category: "Color · Gradient",
    description:
      "The SKY & BLOOM palette, set in motion. Drag the hue and watch sky blue melt into bloom pink, live.",
    detail:
      "Two sliders drive a live gradient built only from the official palette. The hue control rotates the blend while the softness control changes how the colors meet. Copy the CSS it generates and take the gradient with you — it is a real, usable snippet, not a screenshot.",
    accent: "#65B8E8",
    tall: true,
  },
  {
    id: "orbit-type",
    index: "03",
    name: "Orbit Type",
    category: "Typography · Interaction",
    description:
      "Letters that refuse to sit still. The word BLOOM orbits your cursor — pull it close, push it away.",
    detail:
      "Every letter is an independent body in a small orbital system, attracted to the pointer and pushed apart by its neighbours. It is typography treated as a physical material: expressive, a little unruly, and different every time you move.",
    accent: "#24658F",
  },
];
