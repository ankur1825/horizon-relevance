"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
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

// 3×2 grid — desktop positions relative to center (px). Scaled responsively.
const BASE_POS = [
  { col: -1, row: -1 }, // Healthcare
  { col:  0, row: -1 }, // FinTech
  { col:  1, row: -1 }, // Finance
  { col: -1, row:  1 }, // Enterprise
  { col:  0, row:  1 }, // Retail
  { col:  1, row:  1 }, // Startups
];

// Tight initial cluster offsets so icons look grouped before scatter
const CLUSTER = [
  { x: -14, y: -12 },
  { x:  12, y:  -9 },
  { x:  -5, y:  15 },
  { x:  17, y:  11 },
  { x: -11, y:   5 },
  { x:   5, y: -17 },
];

// Fraction of total scroll used for the scatter animation
const SCATTER_RANGE = 0.62;

// ─── ScatterIcon ──────────────────────────────────────────────────────────────

function ScatterIcon({
  industry,
  index,
  total,
  progress,
  fx,
  fy,
}: {
  industry: Industry;
  index: number;
  total: number;
  progress: MotionValue<number>;
  fx: number;
  fy: number;
}) {
  const { icon: Icon, name, metric, metricLabel, iconClass, iconBg, borderGlow } = industry;

  const popStart = (index / total) * SCATTER_RANGE;
  const popEnd = popStart + SCATTER_RANGE / total;
  const textIn = popEnd;
  const textDone = Math.min(textIn + 0.07, 1);

  const x = useTransform(progress, [popStart, popEnd], [CLUSTER[index].x, fx]);
  const y = useTransform(progress, [popStart, popEnd], [CLUSTER[index].y, fy]);
  const iconScale = useTransform(progress, [popStart, popEnd], [0.48, 1]);
  const textOpacity = useTransform(progress, [textIn, textDone], [0, 1]);

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-3"
      style={{
        x,
        y,
        left: "50%",
        top: "50%",
        marginLeft: -36,
        marginTop: -44,
        zIndex: 20 + index,
      }}
    >
      {/* Icon pill */}
      <motion.div
        className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl"
        style={{ scale: iconScale }}
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${iconBg}`} />
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${borderGlow} 0%, transparent 55%)`,
            opacity: 0.55,
          }}
        />
        <div
          className="absolute inset-[1px] flex items-center justify-center rounded-[calc(1rem-1px)]"
          style={{ background: "rgba(6,8,22,0.88)" }}
        >
          <Icon className={`h-7 w-7 ${iconClass}`} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Label — appears after icon lands */}
      <motion.div
        className="flex flex-col items-center gap-1 text-center"
        style={{ opacity: textOpacity }}
      >
        <span className="text-[13px] font-semibold tracking-tight text-white/82">{name}</span>
        <span
          className="font-mono text-[16px] font-bold leading-none"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.94) 0%, ${borderGlow} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {metric}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-white/30">{metricLabel}</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────

export default function Industries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive grid positions
  const [gridPos, setGridPos] = useState(
    BASE_POS.map((p) => ({ x: p.col * 300, y: p.row * 130 })),
  );

  useEffect(() => {
    const update = () => {
      const xSpread = Math.min(300, window.innerWidth * 0.26);
      const ySpread = Math.min(130, window.innerHeight * 0.14);
      setGridPos(BASE_POS.map((p) => ({ x: p.col * xSpread, y: p.row * ySpread })));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.09], [0.75, 0]);

  return (
    <section
      id="industries"
      className="relative"
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
          background: "radial-gradient(ellipse at 42% 40%, rgba(60,85,245,0.26) 0%, rgba(40,65,210,0.1) 46%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, 26, 0], y: [0, -14, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-8%", top: "25%", width: "50vw", height: "68vh",
          background: "radial-gradient(ellipse at 55% 45%, rgba(30,65,220,0.2) 0%, rgba(20,50,190,0.08) 50%, transparent 68%)",
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

      {/* Top edge — from Solutions */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[50] h-36 bg-gradient-to-b from-[#060816] to-transparent" />
      {/* Bottom edge — into Company */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[50] h-36 bg-gradient-to-t from-[#080412] to-transparent" />

      {/* Scroll container */}
      <div ref={containerRef} style={{ height: "280vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Header */}
          <motion.div
            className="absolute inset-x-0 top-0 z-[30] px-6 pt-16 pb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 flex justify-center">
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
          </motion.div>

          {/* Scatter layer */}
          <div className="absolute inset-0">
            {INDUSTRIES.map((industry, i) => (
              <ScatterIcon
                key={industry.name}
                industry={industry}
                index={i}
                total={INDUSTRIES.length}
                progress={scrollYProgress}
                fx={gridPos[i].x}
                fy={gridPos[i].y}
              />
            ))}

            {/* Scroll hint */}
            <motion.div
              className="absolute bottom-8 left-1/2 z-[30] flex -translate-x-1/2 flex-col items-center gap-2"
              style={{ opacity: hintOpacity }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-widest text-white/30"
              >
                Scroll to explore
              </span>
              <motion.div
                className="h-9 w-px origin-top"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(96,165,250,0.6), rgba(96,165,250,0))",
                }}
                animate={{ scaleY: [0, 1, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
