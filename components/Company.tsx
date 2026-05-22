"use client";

import { motion } from "framer-motion";
import { Eye, Target, Layers, ArrowUpRight } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: Eye,
    label: "Vision",
    body: "Transform how the world builds in the cloud. We see a future where infrastructure is invisible, intelligent, and effortlessly scalable — freeing engineering teams to focus entirely on what they create.",
    accent: "rgba(215,50,125,0.55)",
    glow: "rgba(215,50,125,0.12)",
    iconClass: "text-rose-400",
    iconBg: "from-rose-500/[0.2] to-pink-600/[0.08]",
  },
  {
    icon: Target,
    label: "Mission",
    body: "Be the intelligence layer behind cloud-native engineering. We embed into teams adopting cloud, AI, and DevSecOps — delivering measurable outcomes from day one, not six months later.",
    accent: "rgba(180,40,215,0.52)",
    glow: "rgba(180,40,215,0.11)",
    iconClass: "text-fuchsia-400",
    iconBg: "from-fuchsia-500/[0.2] to-purple-600/[0.08]",
  },
  {
    icon: Layers,
    label: "Philosophy",
    body: "We don't consult from outside — we build from within. Engineering excellence, security-first thinking, and relentless automation aren't our services. They're our operating principles.",
    accent: "rgba(145,40,225,0.52)",
    glow: "rgba(145,40,225,0.11)",
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.2] to-indigo-600/[0.08]",
  },
] as const;

const STATS = [
  { value: "2024", label: "Founded" },
  { value: "NJ", label: "Woodbridge, USA" },
  { value: "3×", label: "Faster Deployments" },
  { value: "47%", label: "Avg. Cost Reduction" },
] as const;

// ─── PillarCard ────────────────────────────────────────────────────────────────

function PillarCard({
  pillar,
  delay,
}: {
  pillar: (typeof PILLARS)[number];
  delay: number;
}) {
  const { icon: Icon, label, body, accent, glow, iconClass, iconBg } = pillar;

  return (
    <motion.div
      className="group relative rounded-3xl p-px"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
      whileHover={{ y: -5, transition: { duration: 0.25, ease } }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`,
        }}
      />
      <div
        className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-8"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 10% 0%, ${glow} 0%, transparent 55%), rgba(20,4,22,0.97)`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse 60% 50% at 20% 10%, ${glow.replace(/[\d.]+\)$/, "0.2)")} 0%, transparent 65%)` }}
        />

        <div className={`mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br p-3.5 ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={1.5} />
        </div>

        <h3
          className="mb-4 font-bold tracking-tight text-white/90"
          style={{ fontSize: "clamp(1.1rem,1.6vw,1.35rem)" }}
        >
          {label}
        </h3>

        <p className="text-[14px] leading-relaxed text-white/44">{body}</p>

        <div
          className="absolute bottom-0 left-8 right-8 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

// ─── Company ──────────────────────────────────────────────────────────────────

export default function Company() {
  return (
    <section
      id="company"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{
        background:
          "radial-gradient(ellipse 150% 80% at 85% 0%, #280820 0%, #120214 50%, #08010a 100%)",
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
        animate={{ backgroundPosition: ["0% 0%", "-6% -9%", "7% 5%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Rose bloom — dominant, right-top */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-8%", top: "-5%", width: "70vw", height: "90vh",
          background: "radial-gradient(ellipse 52% 55% at 55% 38%, rgba(215,45,125,0.26) 0%, rgba(175,25,105,0.1) 46%, transparent 68%)",
          filter: "blur(115px)",
        }}
        animate={{ x: [0, -28, 0], y: [0, 16, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet — left-center */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-6%", top: "20%", width: "52vw", height: "70vh",
          background: "radial-gradient(ellipse 54% 48% at 48% 44%, rgba(145,35,215,0.18) 0%, rgba(110,20,180,0.07) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, 24, 0], opacity: [0.55, 0.88, 0.55] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Fuchsia accent — bottom */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "22%", bottom: "8%", width: "38vw", height: "42vh",
          background: "radial-gradient(circle, rgba(220,50,190,0.14) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.42, 0.72, 0.42] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Top edge — from Industries */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#080412] to-transparent" />
      {/* Bottom edge — into Contact */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-36 bg-gradient-to-t from-[#0e0414] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          className="mb-16 text-center sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-rose-400"
                style={{ boxShadow: "0 0 6px rgba(255,65,150,0.9)" }}
              />
              Our Story
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-rose-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Different.
            </motion.span>
          </h2>
        </motion.div>

        {/* Editorial statement */}
        <motion.div
          className="mb-20 mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, delay: 0.1, ease: easeOutExpo }}
        >
          {/* Accent line */}
          <div
            className="mb-8 h-px w-16"
            style={{ background: "linear-gradient(90deg, rgba(215,50,125,0.7), transparent)" }}
          />
          <p
            className="font-semibold leading-tight tracking-tight text-white/80"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)", lineHeight: 1.22 }}
          >
            We are committed to transforming businesses through{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(92deg, rgba(255,100,170,0.95) 0%, rgba(230,100,255,0.9) 50%, rgba(255,100,170,0.95) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              intelligent cloud-native technologies
            </span>{" "}
            — becoming the innovation partner for companies adopting cloud, AI, and DevSecOps strategies worldwide.
          </p>
          <div className="mt-8">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-rose-400/80"
              whileHover={{ gap: "10px", color: "rgba(255,65,150,1)" }}
              transition={{ duration: 0.2, ease }}
            >
              Work with us
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.label} pillar={pillar} delay={i * 0.1} />
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.06] sm:grid-cols-4"
          style={{ background: "rgba(255,255,255,0.04)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="group flex flex-col items-center justify-center gap-1.5 px-6 py-8"
              style={{ background: "rgba(20,4,22,0.88)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.07, ease: easeOutExpo }}
            >
              <span
                className="font-mono font-bold leading-none tracking-tight"
                style={{
                  fontSize: "clamp(1.6rem,2.6vw,2.2rem)",
                  backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(215,50,125,0.85) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {stat.value}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-white/26">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
