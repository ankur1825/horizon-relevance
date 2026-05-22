"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Cloud, ShieldCheck, BrainCircuit, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Easing ───────────────────────────────────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

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
    iconBg: "from-cyan-500/[0.18] to-blue-600/[0.08]",
    glowColor: "rgba(6,182,212,0.13)",
    borderGlow: "rgba(6,182,212,0.5)",
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
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.18] to-purple-600/[0.08]",
    glowColor: "rgba(139,92,246,0.13)",
    borderGlow: "rgba(139,92,246,0.5)",
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
    iconClass: "text-blue-400",
    iconBg: "from-blue-500/[0.18] to-indigo-600/[0.08]",
    glowColor: "rgba(59,130,246,0.13)",
    borderGlow: "rgba(59,130,246,0.5)",
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
    iconClass: "text-indigo-300",
    iconBg: "from-indigo-500/[0.18] to-violet-600/[0.08]",
    glowColor: "rgba(99,102,241,0.13)",
    borderGlow: "rgba(99,102,241,0.5)",
    tags: ["Auto-scaling", "Edge distribution", "Zero overhead"],
    metric: "∞",
    metricLabel: "scale on demand",
  },
];

// How far from the top the cards stick (accounts for navbar)
const CARD_TOP = 88;

// ─── OfferingPanel ────────────────────────────────────────────────────────────

function OfferingPanel({
  offering,
  index,
  total,
  progress,
}: {
  offering: Offering;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const {
    icon: Icon,
    label,
    description,
    iconClass,
    iconBg,
    glowColor,
    borderGlow,
    number,
    tags,
    metric,
    metricLabel,
  } = offering;

  const isLast = index === total - 1;

  // Cards behind shrink toward a minimum scale as subsequent cards stack over them.
  // Each card's active window is [index/total … (index+1)/total].
  const scaleTarget = isLast ? 1 : 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [1, scaleTarget],
  );

  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    isLast ? [1, 1] : [1, 0.48],
  );

  return (
    <div
      className="sticky flex items-center justify-center px-6"
      style={{ top: `${CARD_TOP}px`, height: "100vh", zIndex: 10 + index }}
    >
      <motion.div
        className="relative w-full max-w-4xl rounded-3xl p-px"
        style={{ scale, opacity, transformOrigin: "top center" }}
      >
        {/* 1px gradient border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${borderGlow} 0%, rgba(255,255,255,0.07) 45%, transparent 100%)`,
          }}
        />

        {/* Glass body */}
        <div
          className="relative overflow-hidden rounded-[calc(1.5rem-1px)] px-10 py-12 md:px-14 md:py-14"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 10% 0%, ${glowColor} 0%, transparent 55%), rgba(7,9,22,0.97)`,
          }}
        >
          {/* Large watermark number */}
          <span
            className="pointer-events-none absolute right-10 top-8 select-none font-mono font-black leading-none tracking-tighter text-white/[0.035]"
            style={{ fontSize: "clamp(60px,10vw,100px)" }}
          >
            {number}
          </span>

          {/* Content row */}
          <div className="flex items-start justify-between gap-10">
            {/* Left: icon + text */}
            <div className="flex-1">
              {/* Icon badge */}
              <div
                className={`mb-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br p-4 ${iconBg}`}
              >
                <Icon className={`h-6 w-6 ${iconClass}`} strokeWidth={1.5} />
              </div>

              {/* Label */}
              <h3
                className="mb-5 font-bold leading-tight tracking-tight text-white/90"
                style={{ fontSize: "clamp(1.4rem,2.4vw,2.1rem)" }}
              >
                {label}
              </h3>

              {/* Description */}
              <p className="mb-8 max-w-[480px] text-base leading-relaxed text-white/42">
                {description}
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/38"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: metric callout */}
            <div className="hidden shrink-0 flex-col items-end text-right md:flex">
              <span
                className="font-mono font-bold leading-none tracking-tight"
                style={{
                  fontSize: "clamp(2rem,3.8vw,3.25rem)",
                  backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.92) 0%, ${borderGlow} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {metric}
              </span>
              <span className="mt-2.5 max-w-[120px] text-[11px] font-medium uppercase leading-tight tracking-widest text-white/22">
                {metricLabel}
              </span>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-12 right-12 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${borderGlow}, transparent)`,
            }}
          />
        </div>
      </motion.div>
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

  return (
    // No overflow-hidden on section — it breaks position:sticky on children
    <section
      id="platform"
      className="relative"
      style={{
        background:
          "radial-gradient(ellipse 130% 80% at 10% 0%, #09131f 0%, #070d1c 40%, #050a16 70%, #060b18 100%)",
      }}
    >
      {/* Top edge fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 h-32 bg-gradient-to-b from-[#040408] to-transparent" />

      {/* Section ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[1000px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.18] blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.7) 0%, rgba(6,182,212,0.28) 55%, transparent 100%)",
        }}
      />

      {/* Bottom edge fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-32 bg-gradient-to-t from-[#060813] to-transparent" />

      {/* Section header — sits above the sticky zone, scrolls away normally */}
      <motion.div
        className="relative z-10 px-6 pb-6 pt-28 text-center sm:pt-36"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: easeOutExpo }}
      >
        {/* Eyebrow badge */}
        <div className="mb-5 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-violet-400"
              style={{ boxShadow: "0 0 6px rgba(167,139,250,0.9)" }}
            />
            What We Offer
          </div>
        </div>

        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Our Key{" "}
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Offerings
          </span>
        </h2>
      </motion.div>

      {/* ── Sticky stacking container ──
          Height = N × 100vh gives each card ~100vh of scroll runway.
          All cards share the same top offset; higher z-index cards slide
          over lower ones as the user scrolls, naturally stacking them. */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${OFFERINGS.length * 100}vh` }}
      >
        {OFFERINGS.map((offering, i) => (
          <OfferingPanel
            key={offering.number}
            offering={offering}
            index={i}
            total={OFFERINGS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {/* Bottom spacer before next section */}
      <div className="h-28" />
    </section>
  );
}
