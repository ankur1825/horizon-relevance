"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, Shield, Building2, ShoppingBag, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

type Industry = {
  icon: LucideIcon;
  name: string;
  tagline: string;
  outcomes: string[];
  metric: string;
  metricLabel: string;
  glowColor: string;
  borderGlow: string;
  iconClass: string;
  iconBg: string;
};

const INDUSTRIES: Industry[] = [
  {
    icon: Activity,
    name: "Healthcare",
    tagline: "HIPAA-compliant, always-on infrastructure",
    outcomes: [
      "65% faster incident response with AI",
      "3× faster developer deployments",
      "HIPAA-compliant Lambda workflows",
      "40% infrastructure waste reduction",
    ],
    metric: "65%",
    metricLabel: "faster incident response",
    glowColor: "rgba(0,210,110,0.12)",
    borderGlow: "rgba(0,210,110,0.52)",
    iconClass: "text-emerald-400",
    iconBg: "from-emerald-500/[0.2] to-green-600/[0.08]",
  },
  {
    icon: TrendingUp,
    name: "FinTech",
    tagline: "Cloud cost intelligence at scale",
    outcomes: [
      "Saved 37% on AWS within 2 weeks",
      "AI-powered real-time cost recommendations",
      "Multi-cloud spend visibility in one view",
      "Budget guardrails preventing overruns",
    ],
    metric: "37%",
    metricLabel: "avg. AWS cost reduction",
    glowColor: "rgba(190,215,40,0.1)",
    borderGlow: "rgba(190,215,40,0.5)",
    iconClass: "text-lime-400",
    iconBg: "from-lime-500/[0.2] to-yellow-600/[0.08]",
  },
  {
    icon: Shield,
    name: "Finance",
    tagline: "AI-powered resilience for regulated systems",
    outcomes: [
      "99.99% uptime with AI-powered remediation",
      "Generative AI RCA for rapid recovery",
      "Anomaly detection before user impact",
      "Compliance-ready full audit trails",
    ],
    metric: "99.99%",
    metricLabel: "SLA uptime achieved",
    glowColor: "rgba(0,195,175,0.1)",
    borderGlow: "rgba(0,195,175,0.5)",
    iconClass: "text-teal-400",
    iconBg: "from-teal-500/[0.2] to-cyan-600/[0.08]",
  },
  {
    icon: Building2,
    name: "Enterprise",
    tagline: "Multi-cloud at enterprise scale, zero friction",
    outcomes: [
      "Cloud onboarding: 3 days → 1 hour",
      "75% fewer manual security reviews",
      "GitOps-ready multi-cloud pipelines",
      "LDAP-based access & full audit trail",
    ],
    metric: "3 days",
    metricLabel: "→ 1 hour onboarding",
    glowColor: "rgba(0,195,220,0.1)",
    borderGlow: "rgba(0,195,220,0.5)",
    iconClass: "text-cyan-400",
    iconBg: "from-cyan-500/[0.2] to-blue-600/[0.08]",
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    tagline: "Event-driven scale for peak demand",
    outcomes: [
      "2M+ Lambda invocations, zero downtime",
      "Auto-scaling for flash sales & events",
      "Python-first serverless architecture",
      "CloudWatch monitoring at full scale",
    ],
    metric: "2M+",
    metricLabel: "invocations, zero errors",
    glowColor: "rgba(0,180,145,0.1)",
    borderGlow: "rgba(0,180,145,0.5)",
    iconClass: "text-green-400",
    iconBg: "from-green-500/[0.2] to-teal-600/[0.08]",
  },
  {
    icon: Rocket,
    name: "Startups",
    tagline: "Ship fast, stay secure, scale fearlessly",
    outcomes: [
      "Zero-config serverless from day one",
      "No-code CI/CD pipelines out of the box",
      "Security & compliance built in",
      "Pay-as-you-scale infrastructure",
    ],
    metric: "Day 1",
    metricLabel: "to production-ready infra",
    glowColor: "rgba(145,220,55,0.09)",
    borderGlow: "rgba(145,220,55,0.48)",
    iconClass: "text-lime-300",
    iconBg: "from-lime-400/[0.2] to-green-600/[0.08]",
  },
];

// ─── Marquee ──────────────────────────────────────────────────────────────────
// Doubled items + x: "0%" → "-50%" = seamless infinite loop

const MARQUEE_ITEMS = [...INDUSTRIES, ...INDUSTRIES];

function Marquee() {
  return (
    <div className="relative overflow-hidden py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#051a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#051a0a] to-transparent" />
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {MARQUEE_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <item.icon
              className={`h-3.5 w-3.5 flex-shrink-0 ${item.iconClass} opacity-55`}
              strokeWidth={1.5}
            />
            <span className="text-sm font-medium tracking-wide text-white/20">{item.name}</span>
            <span className="text-white/[0.08]">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── IndustryCard ─────────────────────────────────────────────────────────────

function IndustryCard({ industry, delay }: { industry: Industry; delay: number }) {
  const {
    icon: Icon,
    name,
    tagline,
    outcomes,
    metric,
    metricLabel,
    glowColor,
    borderGlow,
    iconClass,
    iconBg,
  } = industry;

  return (
    <motion.div
      className="group relative rounded-3xl p-px"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
      whileHover={{
        y: -6,
        transition: { duration: 0.28, ease },
      }}
    >
      {/* Border — faint at rest, full on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-35 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${borderGlow} 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`,
        }}
      />

      {/* Card body */}
      <div
        className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-7"
        style={{
          background: `radial-gradient(ellipse 75% 60% at 15% 0%, ${glowColor} 0%, transparent 55%), rgba(5,20,8,0.96)`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 0 0 0px ${borderGlow}`,
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Ambient inner hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 20% 10%, ${glowColor.replace(/[\d.]+\)$/, "0.22)")} 0%, transparent 65%)`,
            boxShadow: `inset 0 0 0 1px ${borderGlow.replace(/[\d.]+\)$/, "0.15)")}`,
          }}
        />

        {/* Icon */}
        <div
          className={`mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br p-3 ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={1.5} />
        </div>

        {/* Name */}
        <h3 className="mb-1.5 text-xl font-bold tracking-tight text-white/92">{name}</h3>

        {/* Tagline */}
        <p className="mb-6 text-[13px] leading-relaxed text-white/36">{tagline}</p>

        {/* Outcomes */}
        <ul className="mb-7 space-y-2.5">
          {outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2.5">
              <span
                className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: borderGlow }}
              />
              <span className="text-[13px] leading-snug text-white/48">{outcome}</span>
            </li>
          ))}
        </ul>

        {/* Metric block */}
        <div
          className="rounded-2xl border px-5 py-3.5"
          style={{
            borderColor: borderGlow.replace(/[\d.]+\)$/, "0.18)"),
            background: glowColor.replace(/[\d.]+\)$/, "0.07)"),
          }}
        >
          <span
            className="block font-mono text-2xl font-bold leading-none"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.92) 0%, ${borderGlow} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {metric}
          </span>
          <span className="mt-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/26">
            {metricLabel}
          </span>
        </div>

        {/* Bottom accent line on hover */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${borderGlow}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{
        background:
          "radial-gradient(ellipse 140% 80% at 12% 5%, #0d2a10 0%, #051a0a 45%, #030e07 100%)",
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
        animate={{ backgroundPosition: ["0% 0%", "-5% -9%", "8% 4%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Scene blobs */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-5%", top: "5%", width: "62vw", height: "82vh",
          background: "radial-gradient(ellipse at 42% 40%, rgba(0,195,95,0.28) 0%, rgba(0,150,80,0.1) 46%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, 26, 0], y: [0, -14, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-8%", top: "25%", width: "50vw", height: "68vh",
          background: "radial-gradient(ellipse at 55% 45%, rgba(0,185,160,0.2) 0%, rgba(0,150,130,0.08) 50%, transparent 68%)",
          filter: "blur(95px)",
        }}
        animate={{ x: [0, -22, 0], opacity: [0.58, 0.9, 0.58] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "28%", bottom: "10%", width: "36vw", height: "40vh",
          background: "radial-gradient(circle, rgba(175,215,45,0.14) 0%, transparent 62%)",
          filter: "blur(85px)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.44, 0.76, 0.44] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Top edge — from Solutions' dark indigo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#051a0a] to-transparent" />
      {/* Bottom edge — to Company section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-36 bg-gradient-to-t from-[#080412] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 6px rgba(52,211,153,0.9)" }}
              />
              Who We Serve
            </div>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built for Every{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Industry
            </motion.span>
          </h2>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/34"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeOutExpo }}
          >
            From regulated healthcare systems to high-velocity startups — our platform adapts to
            your constraints and accelerates your team.
          </motion.p>
        </motion.div>

        {/* Marquee — atmospheric, not content-heavy */}
        <Marquee />

        {/* Staggered card grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard
              key={industry.name}
              industry={industry}
              delay={(i % 3) * 0.1 + Math.floor(i / 3) * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
