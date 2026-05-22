"use client";

import { motion } from "framer-motion";
import { Cloud, ShieldCheck, BrainCircuit, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Easing — matches Navbar & Hero ───────────────────────────────────────────

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
  span: "lg:col-span-1" | "lg:col-span-2";
};

const OFFERINGS: Offering[] = [
  {
    number: "01",
    icon: Cloud,
    label: "Cloud Cost Optimization",
    description:
      "Reduce cloud expenses and maximize efficiency with intelligent analysis, automated rightsizing, and real-time cost visibility across all your environments.",
    iconClass: "text-cyan-400",
    iconBg: "from-cyan-500/[0.16] to-blue-600/[0.08]",
    glowColor: "rgba(6,182,212,0.2)",
    span: "lg:col-span-2",
  },
  {
    number: "02",
    icon: ShieldCheck,
    label: "DevSecOps as a Service",
    description:
      "Integrate security into your DevOps pipelines — shift left, automate compliance, and ship with confidence.",
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.16] to-purple-600/[0.08]",
    glowColor: "rgba(139,92,246,0.2)",
    span: "lg:col-span-1",
  },
  {
    number: "03",
    icon: BrainCircuit,
    label: "AI-Driven Monitoring & Incident Response",
    description:
      "Proactively detect and resolve issues with AI-powered insights before they impact your users.",
    iconClass: "text-blue-400",
    iconBg: "from-blue-500/[0.16] to-indigo-600/[0.08]",
    glowColor: "rgba(59,130,246,0.2)",
    span: "lg:col-span-1",
  },
  {
    number: "04",
    icon: Zap,
    label: "Serverless Application Framework",
    description:
      "Build and deploy scalable serverless applications with zero infrastructure overhead, automatic scaling, and global edge distribution.",
    iconClass: "text-indigo-300",
    iconBg: "from-indigo-500/[0.16] to-violet-600/[0.08]",
    glowColor: "rgba(99,102,241,0.2)",
    span: "lg:col-span-2",
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const gridContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardRevealVariants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

// ─── BentoCard ────────────────────────────────────────────────────────────────

function BentoCard({ offering }: { offering: Offering }) {
  const {
    icon: Icon,
    label,
    description,
    iconClass,
    iconBg,
    glowColor,
    number,
    span,
  } = offering;

  return (
    <motion.article
      className={`group relative cursor-default rounded-2xl p-px ${span}`}
      variants={cardRevealVariants}
      whileHover={{
        y: -5,
        boxShadow: `0 0 0 1px ${glowColor}, 0 24px 64px ${glowColor}`,
        transition: { duration: 0.3, ease },
      }}
    >
      {/* Gradient border — brightens on hover via CSS group-hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.1] via-white/[0.03] to-white/[0.07] transition-all duration-500 group-hover:from-white/[0.18] group-hover:via-white/[0.06] group-hover:to-white/[0.12]" />

      {/* Ambient inner glow (color-specific, appears on hover) */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 30% 0%, ${glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Glass card body */}
      <div className="relative h-full rounded-xl bg-[#09090f]/95 p-7 backdrop-blur-sm">
        {/* Card number */}
        <span className="absolute right-6 top-6 font-mono text-xs font-medium tabular-nums text-white/15">
          {number}
        </span>

        {/* Icon */}
        <div
          className={`mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br p-3 ${iconBg}`}
        >
          <Icon className={`h-[18px] w-[18px] ${iconClass}`} strokeWidth={1.5} />
        </div>

        {/* Label */}
        <h3 className="mb-3 pr-8 text-[15px] font-semibold leading-snug tracking-tight text-white/90">
          {label}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/40">{description}</p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
          }}
        />
      </div>
    </motion.article>
  );
}

// ─── Offerings ────────────────────────────────────────────────────────────────

export default function Offerings() {
  return (
    <section className="relative overflow-hidden bg-[#08080e] px-6 py-28 sm:py-36">
      {/* Section ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.7) 0%, rgba(6,182,212,0.35) 55%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          {/* Eyebrow badge — same system as Hero */}
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

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {OFFERINGS.map((offering) => (
            <BentoCard key={offering.number} offering={offering} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
