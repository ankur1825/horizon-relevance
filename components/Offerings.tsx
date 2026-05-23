"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Cloud, ShieldCheck, BrainCircuit, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

type Offering = {
  number: string;
  icon: LucideIcon;
  label: string;
  description: string;
  iconClass: string;
  iconBg: string;
  glowColor: string;
  borderGlow: string;
  tags: string[];
  metric: string;
  metricLabel: string;
};

const OFFERINGS: Offering[] = [
  {
    number: "01",
    icon: Cloud,
    label: "Cloud Cost Optimization",
    description:
      "Reduce cloud expenses and maximize efficiency with intelligent analysis, automated rightsizing, and real-time cost visibility across all your environments.",
    iconClass: "text-cyan-400",
    iconBg: "from-cyan-500/[0.2] to-blue-600/[0.08]",
    glowColor: "rgba(6,182,212,0.13)",
    borderGlow: "rgba(6,182,212,0.55)",
    tags: ["Auto-rightsizing", "Real-time visibility", "Multi-cloud"],
    metric: "↓ 47%",
    metricLabel: "avg. cost reduction",
  },
  {
    number: "02",
    icon: ShieldCheck,
    label: "DevSecOps as a Service",
    description:
      "Integrate security into your DevOps pipelines — shift left, automate compliance, and ship with confidence.",
    iconClass: "text-fuchsia-400",
    iconBg: "from-fuchsia-500/[0.2] to-purple-600/[0.08]",
    glowColor: "rgba(232,72,212,0.13)",
    borderGlow: "rgba(232,72,212,0.55)",
    tags: ["Shift-left security", "Compliance automation", "Zero-trust"],
    metric: "100%",
    metricLabel: "policy coverage",
  },
  {
    number: "03",
    icon: BrainCircuit,
    label: "AI-Driven Monitoring & Incident Response",
    description:
      "Proactively detect and resolve issues with AI-powered insights before they impact your users.",
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.2] to-indigo-600/[0.08]",
    glowColor: "rgba(139,92,246,0.13)",
    borderGlow: "rgba(139,92,246,0.55)",
    tags: ["Predictive alerting", "Auto-remediation", "AIOps"],
    metric: "< 2 min",
    metricLabel: "mean time to detect",
  },
  {
    number: "04",
    icon: Zap,
    label: "Serverless Application Framework",
    description:
      "Build and deploy scalable serverless applications with zero infrastructure overhead, automatic scaling, and global edge distribution.",
    iconClass: "text-pink-300",
    iconBg: "from-pink-500/[0.2] to-rose-600/[0.08]",
    glowColor: "rgba(244,114,182,0.13)",
    borderGlow: "rgba(244,114,182,0.55)",
    tags: ["Auto-scaling", "Edge distribution", "Zero overhead"],
    metric: "∞",
    metricLabel: "scale on demand",
  },
];

const STICKY_TOP = 88;
const TAB_HEIGHT = 72;
const TAB_GAP = 6;

// ─── Scene background ──────────────────────────────────────────────────────────

function SceneBackground() {
  return (
    <div
      className="sticky top-0 z-[2] h-[100vh] overflow-hidden"
      style={{ marginBottom: "-100vh" }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[10]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.08,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-5% -9%", "8% 5%", "-6% 11%", "4% -4%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute"
        style={{
          left: "-10%", top: "5%", width: "75vw", height: "95vh",
          background: "radial-gradient(ellipse 48% 55% at 42% 40%, rgba(155,50,255,0.32) 0%, rgba(110,30,210,0.14) 45%, transparent 68%)",
          filter: "blur(115px)",
        }}
        animate={{ x: [0, 32, 0], y: [0, -18, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute"
        style={{
          right: "-8%", top: "10%", width: "55vw", height: "75vh",
          background: "radial-gradient(ellipse 54% 50% at 52% 45%, rgba(230,60,185,0.24) 0%, rgba(185,40,145,0.1) 48%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, -26, 0], opacity: [0.6, 0.92, 0.6] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
      />
      <motion.div
        className="absolute"
        style={{
          left: "15%", bottom: "8%", width: "40vw", height: "40vh",
          background: "radial-gradient(circle, rgba(0,185,175,0.18) 0%, transparent 62%)",
          filter: "blur(88px)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.48, 0.82, 0.48] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 140% 100% at 20% 5%, #220950 0%, #0d0520 50%, #080318 100%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}

// ─── Collapsed tab (previous offering) ────────────────────────────────────────

function OfferingTab({ offering }: { offering: Offering }) {
  const { icon: Icon, number, label, iconClass, iconBg, borderGlow } = offering;
  return (
    <motion.div
      className="relative flex shrink-0 items-center gap-3.5 overflow-hidden rounded-2xl px-5"
      style={{
        height: TAB_HEIGHT,
        background: "rgba(14,5,32,0.92)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.32, ease }}
    >
      {/* Left color bar */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-r-full"
        style={{ background: `linear-gradient(to bottom, ${borderGlow}, transparent)` }}
      />
      <div className={`ml-2 inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-2.5 ${iconBg}`}>
        <Icon className={`h-4 w-4 ${iconClass}`} strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] font-medium text-white/25">{number}</p>
        <p className="truncate text-sm font-semibold leading-tight text-white/55">{label}</p>
      </div>
      {/* Subtle bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, ${borderGlow}40, transparent 60%)` }}
      />
    </motion.div>
  );
}

// ─── Expanded active card ──────────────────────────────────────────────────────

function ExpandedCard({ offering }: { offering: Offering }) {
  const { icon: Icon, label, description, iconClass, iconBg, glowColor, borderGlow, number, tags, metric, metricLabel } = offering;
  return (
    <div
      className="relative h-full w-full rounded-3xl p-px"
      style={{
        background: `linear-gradient(135deg, ${borderGlow} 0%, rgba(255,255,255,0.06) 45%, transparent 100%)`,
      }}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] px-8 py-8"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 10% 0%, ${glowColor} 0%, transparent 52%), rgba(14,5,32,1)`,
        }}
      >
        {/* Watermark */}
        <span
          className="pointer-events-none absolute right-8 top-5 select-none font-mono font-black leading-none tracking-tighter text-white/[0.035]"
          style={{ fontSize: "clamp(56px,7vw,88px)" }}
        >
          {number}
        </span>

        {/* Icon */}
        <div className={`mb-5 inline-flex self-start items-center justify-center rounded-2xl bg-gradient-to-br p-4 ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconClass}`} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3
          className="mb-4 font-bold leading-tight tracking-tight text-white/92"
          style={{ fontSize: "clamp(1.2rem,1.9vw,1.85rem)" }}
        >
          {label}
        </h3>

        {/* Description */}
        <p className="text-[15px] leading-relaxed text-white/42 max-w-[500px]">
          {description}
        </p>

        {/* Metric row */}
        <div className="mt-6 flex items-baseline gap-3">
          <span
            className="font-mono text-3xl font-bold leading-none"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.9) 0%, ${borderGlow} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {metric}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-widest text-white/28">
            {metricLabel}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/38"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${borderGlow}, transparent)` }}
        />
      </div>
    </div>
  );
}

// ─── Right visual panel ────────────────────────────────────────────────────────

function OfferingVisual({ offering }: { offering: Offering }) {
  const { icon: Icon, iconClass, iconBg, glowColor, borderGlow } = offering;

  const glow = (a: number) => glowColor.replace(/[\d.]+\)$/, `${a})`);
  const border = (a: number) => borderGlow.replace(/[\d.]+\)$/, `${a})`);

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl"
      style={{
        background: "rgba(10,4,26,0.75)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Radial bloom */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 68% 58% at 50% 50%, ${glow(0.4)} 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative concentric rings */}
      {([160, 230, 305] as const).map((size, i) => (
        <motion.div
          key={size}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: size,
            height: size,
            border: `1px solid ${border(0.1 - i * 0.025)}`,
          }}
          animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
          transition={{ duration: 22 + i * 8, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Floating icon */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className={`inline-flex items-center justify-center rounded-3xl bg-gradient-to-br p-7 ${iconBg}`}
          style={{ boxShadow: `0 0 40px ${glow(0.55)}, 0 0 90px ${glow(0.2)}` }}
        >
          <Icon className={`h-14 w-14 ${iconClass}`} strokeWidth={1.25} />
        </div>
      </motion.div>

      {/* Corner gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ background: `linear-gradient(135deg, ${border(0.1)} 0%, transparent 55%)` }}
      />
    </div>
  );
}

// ─── Offerings ────────────────────────────────────────────────────────────────

export default function Offerings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * OFFERINGS.length),
        OFFERINGS.length - 1,
      );
      setActiveIndex(Math.max(0, idx));
    });
  }, [scrollYProgress]);

  return (
    <section
      id="platform"
      className="relative"
      style={{
        background:
          "radial-gradient(ellipse 150% 100% at 20% 5%, #1e0840 0%, #0d0520 45%, #08031a 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 h-36 bg-gradient-to-b from-[#0c0520] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-36 bg-gradient-to-t from-[#060b22] to-transparent" />

      {/* Section header */}
      <motion.div
        className="relative z-[10] px-6 pb-6 pt-28 text-center sm:pt-36"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: easeOutExpo }}
      >
        <div className="mb-5 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-fuchsia-400"
              style={{ boxShadow: "0 0 6px rgba(232,72,212,0.9)" }}
            />
            What We Offer
          </div>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Our Key{" "}
          <motion.span
            className="inline-block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-pink-400 bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 100%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            Offerings
          </motion.span>
        </h2>
      </motion.div>

      {/* Scroll driver */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${OFFERINGS.length * 100}vh` }}
      >
        <SceneBackground />

        {/* Single sticky two-column panel */}
        <div
          className="sticky flex gap-4 px-6 lg:gap-5"
          style={{
            top: STICKY_TOP,
            height: `calc(100vh - ${STICKY_TOP}px)`,
            zIndex: 10,
            paddingTop: 16,
            paddingBottom: 28,
          }}
        >
          {/* ── Left: accordion stack ── */}
          <div
            className="flex min-h-0 flex-1 flex-col"
            style={{ gap: TAB_GAP }}
          >
            {/* Collapsed tabs for already-seen offerings */}
            <AnimatePresence>
              {OFFERINGS.map((offering, i) =>
                i < activeIndex ? (
                  <OfferingTab key={offering.number} offering={offering} />
                ) : null,
              )}
            </AnimatePresence>

            {/* Active expanded card */}
            <div className="min-h-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.38, ease }}
                  className="h-full"
                >
                  <ExpandedCard offering={OFFERINGS[activeIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right: visual panel (desktop only) ── */}
          <div className="hidden w-[38%] shrink-0 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -14 }}
                transition={{ duration: 0.42, ease }}
                className="h-full"
              >
                <OfferingVisual offering={OFFERINGS[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="h-28" />
    </section>
  );
}
