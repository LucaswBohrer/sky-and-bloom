"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Flower2, Mail } from "lucide-react";
import { CONTACT_EMAIL, SOCIALS } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Contact form without a backend: submitting composes a real email in the
 * visitor's own mail client (mailto). Nothing is simulated and no message
 * is pretended to have been sent. To add a backend later, wire this form
 * to a service such as Formspree or Resend — see README.
 */
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`SKY & BLOOM — message from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputCls =
    "w-full rounded-2xl border border-deep/15 bg-white px-4 py-3.5 text-ink placeholder:text-ink/40 focus:border-sky focus:outline-none";

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden bg-deep pt-24 pb-12 text-white sm:pt-32">
      <div aria-hidden="true" className="blob absolute -top-32 -right-24 size-[420px] bg-sky/30 blur-3xl" />
      <div aria-hidden="true" className="blob absolute -bottom-40 -left-24 size-[420px] bg-bloom/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-bloom-soft uppercase">05 · Contact</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-bold sm:text-6xl">
              Let&apos;s create <span className="text-bloom-soft">something</span> that blooms.
            </h2>
            <p className="mt-6 max-w-md font-editorial text-2xl text-white/80 italic">
              A collaboration, an experiment, a wild idea — the garden is open.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-white/70">
              Write a few lines and your mail app opens with the message ready to
              send — no account, no tracking, no fake “sent” state.
            </p>

            <div className="mt-10">
              <p className="text-xs font-bold tracking-[0.25em] text-white/50 uppercase">Find SKY &amp; BLOOM</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-bloom-soft hover:text-bloom-soft"
                    >
                      {s.name}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-white underline decoration-bloom-soft decoration-2 underline-offset-4 hover:text-bloom-soft"
              >
                <Mail className="size-4" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-[2rem] bg-white p-6 text-ink shadow-2xl sm:p-8"
              aria-label="Contact form"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-deep">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-deep">
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-deep">
                  Your idea
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you would like to create together…"
                  className={`${inputCls} resize-y`}
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full cursor-pointer rounded-full bg-deep py-4 font-semibold text-white shadow-lg shadow-deep/25 transition-transform hover:scale-[1.01]"
              >
                Compose email
              </button>
              {sent && (
                <p className="mt-4 flex items-center gap-2 rounded-xl bg-ice px-4 py-3 text-sm font-medium text-deep" role="status">
                  <Check className="size-4 shrink-0" aria-hidden="true" />
                  Your mail app should have opened with the message ready. If it did not, write directly to {CONTACT_EMAIL}.
                </p>
              )}
              <p className="mt-4 text-center text-xs text-ink/50">
                Your email app will open with the message ready to send — nothing is stored anywhere.
              </p>
            </form>
          </Reveal>
        </div>
      </div>

      <footer className="relative mx-auto mt-14 max-w-7xl border-t border-white/15 px-5 pt-8 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <a href="#top" className="flex items-center gap-2" aria-label="SKY & BLOOM — back to top">
            <span className="grid size-9 place-items-center rounded-full bg-white/15 text-white">
              <Flower2 className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              SKY <span className="text-bloom-soft">&amp;</span> BLOOM
            </span>
          </a>
          <p className="text-sm text-white/60">
            An immersive creative web experience — motion, interaction, color.
          </p>
          <p className="text-sm text-white/60">© 2026 SKY &amp; BLOOM. Made with sky, bloom and code.</p>
        </div>
      </footer>
    </section>
  );
}
