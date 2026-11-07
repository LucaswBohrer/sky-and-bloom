# SKY & BLOOM

> **An immersive creative web experience exploring motion, interaction, color and digital experimentation.**

Where imagination meets interaction. SKY & BLOOM is a living digital garden — floating 3D spheres, blooming color and motion you can actually touch. Built as a professional portfolio piece, not a template.

**Live:** https://sky-and-bloom.vercel.app
**Repo:** https://github.com/LucaswBohrer/sky-and-bloom

---

## Concept

A website that feels less like a document and more like a place: air, light, things that drift and bloom when you arrive. Five sections tell one story — a hero that opens the world, three live experiments, a hands-on playground, an editorial about-section, and a contact finale.

No client work is invented. Every experiment is explicitly presented as a demonstration created by SKY & BLOOM itself.

## Visual identity

| Color      | HEX     | Role                  |
| ---------- | ------- | --------------------- |
| Sky Blue   | #65B8E8 | Primary               |
| Pure White | #FFFFFF | Predominant background |
| Bloom Pink | #F28DB5 | Highlights & details  |
| Deep Blue  | #24658F | Text & contrast       |
| Ice Blue   | #EAF5FC | Secondary backgrounds |
| Soft Pink  | #FBE5EF | Special surfaces      |
| Dark Text  | #243747 | Dark typography       |

Rough visual distribution: white ~50%, blues ~35%, pinks ~15%.

**Typography:** Space Grotesk (display), Inter (body/UI), Cormorant Garamond (editorial italics) — loaded via `next/font/google`.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme tokens in `src/app/globals.css`)
- **Motion** (Framer Motion successor) for entrance, scroll and micro-interactions
- **Three.js** + **React Three Fiber** + **Drei** for the hero's floating 3D universe (lazy-loaded, `ssr: false`)
- **Lucide React** for icons

No backend, no paid services, no environment variables required.

## Features

- **Hero** — staggered text reveal, parallax on scroll, lazy 3D scene with translucent spheres and petals, interactive Bloom flower, scroll indicator.
- **Experiments** — asymmetric editorial grid with 3 original, functional demos, each with a detail modal:
  1. **Petal Physics** — canvas petals with wind + pointer repulsion.
  2. **Chromatic Drift** — live gradient lab with hue/softness sliders and copyable CSS.
  3. **Orbit Type** — the letters of BLOOM orbiting your pointer.
- **Playground** — four working stations + global reset:
  - **Color Playground** — mix background / accent / text from the palette, live preview, copyable hex + CSS.
  - **Floating Universe** — 2D canvas bubbles at different depths, pointer & touch reactive.
  - **Interactive Shapes** — tap to cycle color, scale and rotation; shuffle all.
  - **Bloom Effect** — slider-driven flower bloom (also scroll-driven in About).
- **Effects system** — Bloom Effect, Floating Universe (3D + 2D), Cursor Trail, Magnetic Buttons, morphing shapes, color playground. `prefers-reduced-motion` is respected everywhere; cursor trail and hover effects are disabled on touch devices.
- **About** — editorial narrative, scroll-driven bloom.
- **Contact** — form + social links + full footer. The form has **no backend**: submitting composes a real email in the visitor's mail client (`mailto:`). Nothing is simulated.
- **Responsive** — mobile-first, hamburger nav, no horizontal overflow, touch-sized targets. **Accessible** — semantic HTML, skip link, visible focus, labelled controls, keyboard-closable modal.

## Project structure

```
sky-and-bloom/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # fonts, metadata, SEO
│   │   ├── page.tsx          # section composition
│   │   ├── globals.css       # Tailwind v4 theme + palette tokens
│   │   └── loading.tsx
│   ├── components/
│   │   ├── navigation/       # Navbar
│   │   ├── hero/             # Hero
│   │   ├── experiments/      # Gallery + PetalCanvas, GradientLab, OrbitType
│   │   ├── playground/       # Playground + FloatingUniverse2D
│   │   ├── about/            # About
│   │   ├── contact/          # Contact + footer
│   │   ├── effects/          # BloomFlower, FloatingUniverse3D, CursorTrail
│   │   └── ui/               # Reveal, MagneticButton
│   ├── data/                 # experiments content
│   └── lib/                  # palette, socials, nav links
├── README.md
├── package.json
└── tsconfig.json
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
npm start          # serve the production build
```

Requirements: Node.js 20+ and npm.

## Environment variables

None. The contact form uses `mailto:` by design.

### Connecting a real form backend (optional)

To receive messages without opening a mail client, wire the form in
`src/components/contact/Contact.tsx` to a service such as
[Formspree](https://formspree.io) or [Resend](https://resend.com): replace the
`mailto:` submit with a `fetch` POST to the service endpoint and store the
endpoint/key in an environment variable (never commit secrets).

## Deploy

Production runs on Vercel, connected to this repository — every push to `main` deploys automatically. Framework preset: Next.js. No build settings or env vars needed.

## Known limitations

- The 3D hero scene is decorative and loads lazily; on very low-end devices it renders a static gradient background instead.
- The contact form needs a mail client configured on the visitor's device (or a backend, see above).
- Lighthouse scores are targets to measure in production, not claims made here.
