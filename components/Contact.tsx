"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Send, CheckCircle2 } from "lucide-react";
import type { FormEvent } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const ROSE = "rgba(215,50,125,0.55)";
const ROSE_GLOW = "rgba(215,50,125,0.13)";

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", href: "#", Icon: IconLinkedIn },
  { label: "X / Twitter", href: "#", Icon: IconX },
  { label: "GitHub", href: "#", Icon: IconGitHub },
] as const;

// ─── ContactForm ───────────────────────────────────────────────────────────────

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", company: "", message: "" });

  function set(k: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  }

  const inputBase =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white/82 placeholder:text-white/22 outline-none transition-all duration-200 focus:border-rose-500/40 focus:bg-white/[0.05] focus:ring-0";

  return (
    <motion.div
      className="relative rounded-3xl p-px"
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay: 0.12, ease: easeOutExpo }}
    >
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${ROSE} 0%, rgba(255,255,255,0.05) 45%, transparent 100%)`,
          opacity: 0.45,
        }}
      />

      {/* Glass body */}
      <div
        className="relative overflow-hidden rounded-[calc(1.5rem-1px)] px-8 py-10"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 8% 0%, ${ROSE_GLOW} 0%, transparent 55%), rgba(20,4,22,0.97)`,
          backdropFilter: "blur(12px)",
        }}
      >
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              className="flex flex-col items-center justify-center gap-5 py-12 text-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: easeOutExpo }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(215,50,125,0.15)", border: "1px solid rgba(215,50,125,0.35)" }}
              >
                <CheckCircle2 className="h-7 w-7 text-rose-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-lg font-semibold text-white/90">Message received.</p>
                <p className="mt-1.5 text-[13px] text-white/38">
                  We'll be in touch at {fields.email || "your inbox"} within 24 hours.
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setFields({ name: "", email: "", company: "", message: "" }); }}
                className="mt-2 text-[12px] font-medium text-rose-400/60 underline underline-offset-4 hover:text-rose-400"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={fields.name}
                    onChange={set("name")}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={fields.email}
                    onChange={set("email")}
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Optional"
                  value={fields.company}
                  onChange={set("company")}
                  className={inputBase}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-white/30">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you're building — or what's breaking."
                  value={fields.message}
                  onChange={set("message")}
                  className={`${inputBase} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="mt-1 flex items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(215,50,125,0.9) 0%, rgba(160,30,180,0.85) 100%)",
                  boxShadow: "0 0 24px rgba(215,50,125,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 36px rgba(215,50,125,0.38), inset 0 1px 0 rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18, ease }}
              >
                {sending ? (
                  <>
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" strokeWidth={1.8} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden pb-0 pt-28 sm:pt-36"
      style={{
        background:
          "radial-gradient(ellipse 150% 85% at 15% 0%, #280820 0%, #120214 50%, #08010a 100%)",
      }}
    >
      {/* Grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.08,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-5% -9%", "7% 5%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Rose bloom — left-top */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-8%", top: "-5%", width: "68vw", height: "90vh",
          background: "radial-gradient(ellipse 52% 55% at 44% 38%, rgba(215,45,125,0.28) 0%, rgba(175,25,105,0.1) 46%, transparent 68%)",
          filter: "blur(115px)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -18, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet — right */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-10%", top: "10%", width: "58vw", height: "78vh",
          background: "radial-gradient(ellipse 56% 50% at 52% 44%, rgba(130,35,210,0.22) 0%, rgba(95,20,175,0.08) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, -24, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Hot pink spot — center-bottom */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "30%", bottom: "15%", width: "36vw", height: "44vh",
          background: "radial-gradient(circle, rgba(255,65,150,0.15) 0%, transparent 62%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.72, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Top edge — from Company */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#0e0414] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">

        {/* Two-column grid */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, ease: easeOutExpo }}
          >
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-rose-400"
                style={{ boxShadow: "0 0 6px rgba(255,65,150,0.9)" }}
              />
              Get in Touch
            </div>

            {/* Headline */}
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let&apos;s Build{" "}
              <br className="hidden sm:block" />
              <motion.span
                className="inline-block bg-gradient-to-r from-rose-400 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                Something Remarkable.
              </motion.span>
            </h2>

            <p className="mb-10 max-w-sm text-[14px] leading-relaxed text-white/38">
              Whether you're scaling fast, cutting cloud costs, or hardening your security posture
              — we'd love to hear about it.
            </p>

            {/* Divider */}
            <div
              className="mb-8 h-px w-12"
              style={{ background: "linear-gradient(90deg, rgba(215,50,125,0.7), transparent)" }}
            />

            {/* Contact details */}
            <div className="mb-8 flex flex-col gap-4">
              <a
                href="mailto:info@horizonrelevance.com"
                className="group flex items-center gap-3 text-[14px] text-white/50 transition-colors duration-200 hover:text-white/88"
              >
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-200"
                  style={{ background: "rgba(215,50,125,0.1)", border: "1px solid rgba(215,50,125,0.2)" }}
                >
                  <Mail className="h-4 w-4 text-rose-400" strokeWidth={1.5} />
                </div>
                info@horizonrelevance.com
              </a>

              <div className="flex items-center gap-3 text-[14px] text-white/50">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "rgba(215,50,125,0.08)", border: "1px solid rgba(215,50,125,0.15)" }}
                >
                  <MapPin className="h-4 w-4 text-rose-400/70" strokeWidth={1.5} />
                </div>
                Woodbridge, NJ — United States
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/38 transition-colors duration-200 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18, ease }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <ContactForm />
        </div>

        {/* Footer strip */}
        <div
          className="mt-24 border-t py-8 text-center"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/18">
            © 2024 Horizon Relevance LLC · Woodbridge, NJ · Built for engineering teams.
          </p>
        </div>
      </div>
    </section>
  );
}
