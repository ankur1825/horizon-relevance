"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Shield, Building2, ShoppingBag, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Industry = {
  icon: LucideIcon;
  name: string;
  metric: string;
  metricLabel: string;
  iconClass: string;
  iconBg: string;
  borderGlow: string;
};

const INDUSTRIES: Industry[] = [
  {
    icon: Activity,
    name: "Healthcare",
    metric: "65%",
    metricLabel: "faster incident response",
    iconClass: "text-emerald-400",
    iconBg: "from-emerald-500/[0.22] to-green-600/[0.08]",
    borderGlow: "rgba(0,210,110,0.55)",
  },
  {
    icon: TrendingUp,
    name: "FinTech",
    metric: "37%",
    metricLabel: "avg. AWS cost reduction",
    iconClass: "text-lime-400",
    iconBg: "from-lime-500/[0.22] to-yellow-600/[0.08]",
    borderGlow: "rgba(190,215,40,0.52)",
  },
  {
    icon: Shield,
    name: "Finance",
    metric: "99.99%",
    metricLabel: "SLA uptime achieved",
    iconClass: "text-teal-400",
    iconBg: "from-teal-500/[0.22] to-cyan-600/[0.08]",
    borderGlow: "rgba(0,195,175,0.52)",
  },
  {
    icon: Building2,
    name: "Enterprise",
    metric: "72×",
    metricLabel: "faster cloud onboarding",
    iconClass: "text-cyan-400",
    iconBg: "from-cyan-500/[0.22] to-blue-600/[0.08]",
    borderGlow: "rgba(0,195,220,0.52)",
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    metric: "2M+",
    metricLabel: "Lambda invocations",
    iconClass: "text-green-400",
    iconBg: "from-green-500/[0.22] to-teal-600/[0.08]",
    borderGlow: "rgba(0,180,145,0.52)",
  },
  {
    icon: Rocket,
    name: "Startups",
    metric: "Day 1",
    metricLabel: "to production-ready",
    iconClass: "text-lime-300",
    iconBg: "from-lime-400/[0.22] to-green-600/[0.08]",
    borderGlow: "rgba(145,220,55,0.48)",
  },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// ─── IndustryCard ─────────────────────────────────────────────────────────────

function IndustryCard({ industry }: { industry: Industry }) {
  const { icon: Icon, name, metric, metricLabel, iconClass, iconBg, borderGlow } = industry;
  return (
    <div
      className="mx-3 flex flex-shrink-0 items-center gap-4 rounded-2xl px-5 py-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        minWidth: 224,
      }}
    >
      {/* Icon pill */}
      <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl">
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${iconBg}`} />
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(145deg, ${borderGlow} 0%, transparent 55%)`,
            opacity: 0.55,
          }}
        />
        <div
          className="absolute inset-[1px] flex items-center justify-center rounded-[calc(0.75rem-1px)]"
          style={{ background: "rgba(6,8,22,0.88)" }}
        >
          <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* Text */}
      <div>
        <div className="mb-0.5 text-[13px] font-semibold tracking-tight text-white/72">
          {name}
        </div>
        <div
          className="font-mono text-[18px] font-bold leading-none"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.92) 0%, ${borderGlow} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {metric}
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-wider text-white/28">
          {metricLabel}
        </div>
      </div>
    </div>
  );
}

// ─── MarqueeRow ───────────────────────────────────────────────────────────────

function MarqueeRow({
  reversed = false,
  duration = 30,
}: {
  reversed?: boolean;
  duration?: number;
}) {
  const [paused, setPaused] = useState(false);
  const items = reversed ? [...INDUSTRIES].reverse() : [...INDUSTRIES];

  return (
    <div
      className="overflow-hidden py-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          width: "max-content",
          animation: `${reversed ? "marquee-right" : "marquee-left"} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {/* Duplicate cards for seamless loop — -50% = exactly one set */}
        {[...items, ...items].map((ind, i) => (
          <IndustryCard key={i} industry={ind} />
        ))}
      </div>
    </div>
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
          "radial-gradient(ellipse 140% 80% at 12% 5%, #0c1238 0%, #060816 45%, #030610 100%)",
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
        animate={{ backgroundPosition: ["0% 0%", "-6% -8%", "7% 5%", "0% 0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Sapphire bloom — left */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-5%", top: "5%", width: "62vw", height: "82vh",
          background:
            "radial-gradient(ellipse at 42% 40%, rgba(60,85,245,0.26) 0%, rgba(40,65,210,0.1) 46%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, 26, 0], y: [0, -14, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-8%", top: "25%", width: "50vw", height: "68vh",
          background:
            "radial-gradient(ellipse at 55% 45%, rgba(30,65,220,0.2) 0%, rgba(20,50,190,0.08) 50%, transparent 68%)",
          filter: "blur(95px)",
        }}
        animate={{ x: [0, -22, 0], opacity: [0.58, 0.9, 0.58] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "28%", bottom: "10%", width: "36vw", height: "40vh",
          background: "radial-gradient(circle, rgba(90,45,215,0.15) 0%, transparent 62%)",
          filter: "blur(85px)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.44, 0.76, 0.44] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Top / bottom section fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[10] h-36 bg-gradient-to-b from-[#060816] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[10] h-36 bg-gradient-to-t from-[#080412] to-transparent" />

      {/* Left / right fades to hide marquee seams */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[10] w-24 bg-gradient-to-r from-[#060816] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[10] w-24 bg-gradient-to-l from-[#060816] to-transparent" />

      <div className="relative z-[3]">

        {/* Header */}
        <motion.div
          className="mb-16 px-6 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-blue-400"
                style={{ boxShadow: "0 0 6px rgba(96,165,250,0.9)" }}
              />
              Who We Serve
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built for Every{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent"
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
            Real outcomes across every vertical — measured in speed, cost, and uptime.
          </motion.p>
        </motion.div>

        {/* Marquee rows — opposite directions */}
        <div className="flex flex-col gap-4">
          <MarqueeRow duration={34} />
          <MarqueeRow reversed duration={28} />
        </div>

      </div>
    </section>
  );
}
