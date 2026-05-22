"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, TrendingDown, Activity } from "lucide-react";

// ─── Easing — matches Navbar & Offerings ──────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const HEADLINE = [
  { text: "Cloud Engineering,", gradient: false },
  { text: "Intelligently", gradient: false },
  { text: "Automated.", gradient: true },
];

const STATS = [
  { value: "250+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "47%", label: "Cost Reduction" },
];

const METRICS = [
  { label: "Infrastructure", value: 98, color: "from-cyan-500 to-blue-500" },
  { label: "Security Score", value: 94, color: "from-violet-500 to-purple-400" },
  { label: "Cost Efficiency", value: 87, color: "from-blue-500 to-indigo-400" },
  { label: "SLA Compliance", value: 99, color: "from-cyan-400 to-teal-300" },
];

// ─── PrimaryButton ────────────────────────────────────────────────────────────

function PrimaryButton({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="relative inline-flex cursor-pointer select-none items-center overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      variants={{
        rest: { scale: 1, boxShadow: "0 2px 16px rgba(99,102,241,0.3)" },
        hover: {
          scale: 1.03,
          boxShadow:
            "0 0 32px rgba(139,92,246,0.6), 0 0 64px rgba(99,102,241,0.22)",
        },
      }}
      transition={{ duration: 0.25, ease }}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent"
        variants={{ rest: { x: "-120%" }, hover: { x: "140%" } }}
        transition={{ duration: 0.55, ease }}
      />
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

// ─── GhostButton ──────────────────────────────────────────────────────────────

function GhostButton({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="inline-flex cursor-pointer select-none items-center rounded-full border border-white/[0.12] px-6 py-3 text-sm font-semibold text-white/60 backdrop-blur-sm transition-colors duration-300 hover:text-white/95"
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderColor: "rgba(255,255,255,0.22)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease }}
    >
      {label}
    </motion.a>
  );
}

// ─── MetricBar ────────────────────────────────────────────────────────────────

function MetricBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-white/40">{label}</span>
        <span className="font-mono text-[10px] font-semibold text-white/65">
          {value}%
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${value}%`, originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: easeOutExpo, delay }}
        />
      </div>
    </div>
  );
}

// ─── FloatCard (reusable wrapper for stat cards) ──────────────────────────────

function FloatCard({
  children,
  className,
  entryDelay,
  floatDuration,
  floatDelay,
  floatRange,
  entryFrom,
}: {
  children: React.ReactNode;
  className?: string;
  entryDelay: number;
  floatDuration: number;
  floatDelay: number;
  floatRange: [number, number];
  entryFrom: { x?: number; y?: number };
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...entryFrom }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, delay: entryDelay, ease: easeOutExpo }}
    >
      <motion.div
        animate={{ y: [floatRange[0], floatRange[1], floatRange[0]] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── DashboardVisual ──────────────────────────────────────────────────────────

function DashboardVisual() {
  return (
    <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[600px]">
      {/* Deep radial glow behind everything */}
      <div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(6,182,212,0.18) 55%, transparent 100%)",
        }}
      />

      {/* Outer slow-rotating ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute right-[18%] top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-500"
          style={{ boxShadow: "0 0 10px rgba(139,92,246,0.9)" }}
        />
      </motion.div>

      {/* Inner counter-rotating ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute bottom-0 left-[22%] h-1 w-1 translate-y-1/2 rounded-full bg-cyan-400"
          style={{ boxShadow: "0 0 8px rgba(6,182,212,0.9)" }}
        />
      </motion.div>

      {/* ── Main dashboard card ── */}
      <FloatCard
        className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:w-[310px]"
        entryDelay={0.7}
        floatDuration={7}
        floatDelay={0}
        floatRange={[-7, 7]}
        entryFrom={{ y: 28 }}
      >
        <div className="relative rounded-2xl p-px">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.14] via-white/[0.04] to-white/[0.09]" />

          {/* Scan line sweep */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent"
              animate={{ top: ["0%", "100%"] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 5,
              }}
            />
          </div>

          <div className="relative rounded-xl bg-[#0a091e]/96 p-5 backdrop-blur-md">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wide text-white/80">
                Platform Monitor
              </span>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ boxShadow: "0 0 6px rgba(52,211,153,0.85)" }}
                />
                <span className="text-[9px] font-semibold uppercase tracking-widest text-emerald-400">
                  Live
                </span>
              </div>
            </div>

            {/* Metric bars */}
            <div className="space-y-3.5">
              {METRICS.map((m, i) => (
                <MetricBar key={m.label} {...m} delay={1.1 + i * 0.13} />
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <p className="text-[9px] text-white/22">
                Updated just now · Powered by Horizon AI
              </p>
            </div>
          </div>
        </div>
      </FloatCard>

      {/* ── Stat card: Threats Blocked (top-right) ── */}
      <FloatCard
        className="absolute right-[3%] top-[8%] w-[148px]"
        entryDelay={0.95}
        floatDuration={5.5}
        floatDelay={0.8}
        floatRange={[0, -10]}
        entryFrom={{ x: 20, y: -12 }}
      >
        <div className="relative rounded-xl p-px">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/[0.22] via-white/[0.04] to-transparent" />
          <div className="relative rounded-[10px] bg-[#0a091e]/96 p-3.5 backdrop-blur-md">
            <div className="mb-1.5 flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-violet-400" strokeWidth={1.5} />
              <span className="text-[9px] font-medium uppercase tracking-wider text-white/38">
                Threats
              </span>
            </div>
            <div className="text-[18px] font-bold tracking-tight text-white">
              2,847
            </div>
            <div className="text-[9px] text-white/30">Blocked this week</div>
          </div>
        </div>
      </FloatCard>

      {/* ── Stat card: Cost Reduction (bottom-left) ── */}
      <FloatCard
        className="absolute bottom-[12%] left-[2%] w-[148px]"
        entryDelay={1.1}
        floatDuration={6.5}
        floatDelay={1.5}
        floatRange={[0, 9]}
        entryFrom={{ x: -20, y: 12 }}
      >
        <div className="relative rounded-xl p-px">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/[0.22] via-white/[0.04] to-transparent" />
          <div className="relative rounded-[10px] bg-[#0a091e]/96 p-3.5 backdrop-blur-md">
            <div className="mb-1.5 flex items-center gap-1.5">
              <TrendingDown
                className="h-3 w-3 text-cyan-400"
                strokeWidth={1.5}
              />
              <span className="text-[9px] font-medium uppercase tracking-wider text-white/38">
                Cost
              </span>
            </div>
            <div className="text-[18px] font-bold tracking-tight text-white">
              ↓ 47%
            </div>
            <div className="text-[9px] text-white/30">Avg. reduction</div>
          </div>
        </div>
      </FloatCard>

      {/* ── Stat card: AI Status (mid-left) ── */}
      <FloatCard
        className="absolute left-[4%] top-[26%] w-[142px]"
        entryDelay={1.22}
        floatDuration={8}
        floatDelay={3}
        floatRange={[0, -7]}
        entryFrom={{ x: -16, y: 0 }}
      >
        <div className="relative rounded-xl p-px">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/[0.22] via-white/[0.04] to-transparent" />
          <div className="relative rounded-[10px] bg-[#0a091e]/96 p-3.5 backdrop-blur-md">
            <div className="mb-1.5 flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-blue-400" strokeWidth={1.5} />
              <span className="text-[9px] font-medium uppercase tracking-wider text-white/38">
                AI Engine
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-blue-400"
                animate={{ opacity: [1, 0.25, 1], scale: [1, 1.5, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{ boxShadow: "0 0 6px rgba(59,130,246,0.9)" }}
              />
              <span className="text-sm font-bold text-white">Active</span>
            </div>
            <div className="mt-0.5 text-[9px] text-white/30">
              Real-time processing
            </div>
          </div>
        </div>
      </FloatCard>

      {/* Decorative glow dots */}
      <motion.div
        className="absolute right-[10%] bottom-[28%] h-2 w-2 rounded-full bg-violet-400"
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.2, repeat: Infinity }}
        style={{ boxShadow: "0 0 14px rgba(139,92,246,0.9)" }}
      />
      <motion.div
        className="absolute left-[18%] top-[12%] h-1.5 w-1.5 rounded-full bg-cyan-400"
        animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0.9, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1.2 }}
        style={{ boxShadow: "0 0 10px rgba(6,182,212,0.9)" }}
      />
      <motion.div
        className="absolute right-[22%] top-[18%] h-1 w-1 rounded-full bg-indigo-300"
        animate={{ scale: [1, 2, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
        style={{ boxShadow: "0 0 8px rgba(165,180,252,0.9)" }}
      />
    </div>
  );
}

// ─── HeroBackground ───────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fine grain / noise texture */}
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* Subtle tech grid */}
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Aurora: violet — top left */}
      <motion.div
        className="absolute -left-[20%] -top-[15%] h-[85vh] w-[75vw] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(109,40,217,0.24) 0%, rgba(99,102,241,0.1) 45%, transparent 70%)",
        }}
        animate={{
          x: [0, 32, -18, 0],
          y: [0, -22, 38, 0],
          scale: [1, 1.07, 0.96, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora: cyan — top right */}
      <motion.div
        className="absolute -right-[15%] -top-[10%] h-[70vh] w-[65vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.17) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, -42, 20, 0],
          y: [0, 34, -20, 0],
          scale: [1, 0.92, 1.1, 1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Aurora: deep violet — bottom */}
      <motion.div
        className="absolute -bottom-[30%] left-[25%] h-[60vh] w-[65vw] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.14, 0.93, 1], x: [0, 28, -14, 0] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 11,
        }}
      />

      {/* Edge vignette */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_25%,rgba(8,8,14,0.65)_100%)]" />

      {/* Bottom fade — color matches Offerings top edge for seamless blend */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#08101e] to-transparent" />
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const { scrollY } = useScroll();

  // Parallax layers — right drifts faster than left
  const visualY = useTransform(scrollY, [0, 700], [0, -60]);
  const contentY = useTransform(scrollY, [0, 700], [0, -22]);

  return (
    <section
      id="intro"
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 150% 100% at 50% 0%, #100d2e 0%, #0b0922 50%, #070615 100%)",
      }}
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex min-h-screen flex-col items-start justify-center gap-14 pb-16 pt-32 lg:flex-row lg:items-center lg:gap-10 lg:pb-0 lg:pt-0">

          {/* ── Left content ── */}
          <motion.div
            className="relative z-10 max-w-xl flex-shrink-0 lg:max-w-[52%]"
            style={{ y: contentY }}
          >
            {/* Eyebrow badge */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: easeOutExpo }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-violet-400"
                  style={{ boxShadow: "0 0 6px rgba(167,139,250,0.9)" }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                AI · Cloud · DevSecOps
              </div>
            </motion.div>

            {/* Headline — line-by-line clip reveal */}
            <h1 className="mb-8">
              {HEADLINE.map((line, i) => (
                <div key={i} className="overflow-hidden pb-1">
                  <motion.div
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.58 + i * 0.14,
                      ease: easeOutExpo,
                    }}
                  >
                    <span
                      className={`block text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.02em] ${
                        line.gradient
                          ? "bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                          : "text-white"
                      }`}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              className="mb-10 max-w-[440px] text-[17px] leading-relaxed text-white/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.06, ease: easeOutExpo }}
            >
              Build, optimize, and scale intelligent cloud systems with
              automation, security, and real-time AI insights.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mb-14 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.18, ease: easeOutExpo }}
            >
              <PrimaryButton label="Explore Platform" href="#platform" />
              <GhostButton label="Book a Demo" href="#demo" />
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center gap-x-7 gap-y-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3, ease: easeOutExpo }}
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-7">
                  {i > 0 && (
                    <div className="h-7 w-px bg-white/[0.09]" aria-hidden />
                  )}
                  <div>
                    <div className="text-xl font-bold tracking-tight text-white">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/32">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right visual ── */}
          <motion.div
            className="relative w-full flex-1"
            style={{ y: visualY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <DashboardVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
