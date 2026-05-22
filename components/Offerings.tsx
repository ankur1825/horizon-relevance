"use client";

import { motion } from "framer-motion";
import { Cloud, ShieldCheck, TrendingDown, Lock } from "lucide-react";

// ─── Easing — matches design system ───────────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Card entry variants ───────────────────────────────────────────────────────

function makeCardVariants(
  restShadow: string,
  hoverShadow: string,
  initialOffset: { x?: number; y?: number; rotate?: number },
) {
  return {
    entry: {
      hidden: { opacity: 0, y: 48, x: initialOffset.x ?? 0, rotate: initialOffset.rotate ?? 0 },
      show: {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: initialOffset.rotate ?? 0,
        transition: { duration: 0.9, ease: easeOutExpo },
      },
    },
    hover: {
      rest: { boxShadow: restShadow, scale: 1, transition: { duration: 0.35, ease } },
      hovered: { boxShadow: hoverShadow, scale: 1.018, transition: { duration: 0.35, ease } },
    },
  };
}

// ─── PrimaryCard ──────────────────────────────────────────────────────────────

function PrimaryCard() {
  const variants = makeCardVariants(
    "0 8px 40px rgba(124,58,237,0.12), 0 2px 12px rgba(0,0,0,0.4)",
    "0 0 0 1px rgba(139,92,246,0.35), 0 20px 80px rgba(124,58,237,0.32), 0 4px 24px rgba(0,0,0,0.5)",
    { y: 0 },
  );

  return (
    <motion.div
      variants={variants.entry}
      className="relative z-20 w-full rounded-3xl p-px"
      style={{ boxShadow: "0 8px 40px rgba(124,58,237,0.12), 0 2px 12px rgba(0,0,0,0.4)" }}
      initial="rest"
      whileHover="hovered"
      animate="rest"
    >
      {/* Gradient border shell */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.5] via-blue-500/[0.15] to-transparent" />

      {/* Card body */}
      <motion.div
        className="relative h-full rounded-[calc(1.5rem-1px)] p-8"
        variants={variants.hover}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(124,58,237,0.22) 0%, transparent 65%), linear-gradient(160deg, rgba(17,10,45,0.98) 0%, rgba(10,8,30,0.99) 100%)",
        }}
      >
        {/* Inner ambient glow — appears on hover via group or directly via motion */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 30% 10%, rgba(139,92,246,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Icon badge */}
        <div className="mb-7 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/[0.22] to-blue-600/[0.1] p-3.5">
          <Cloud className="h-5 w-5 text-violet-400" strokeWidth={1.5} />
        </div>

        {/* Label */}
        <h3 className="mb-3 text-lg font-semibold tracking-tight text-white/90">
          Cloud Cost Optimization
        </h3>

        {/* Description */}
        <p className="mb-8 max-w-[300px] text-sm leading-relaxed text-white/42">
          Reduce cloud expenses and maximize efficiency with intelligent analysis, automated
          rightsizing, and real-time cost visibility across all your environments.
        </p>

        {/* Stat chip */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/[0.22] bg-violet-500/[0.1] px-4 py-2">
          <TrendingDown className="h-3.5 w-3.5 text-violet-400" strokeWidth={2} />
          <span className="text-xs font-semibold tabular-nums text-violet-300">
            ↓ 47% avg. cost reduction
          </span>
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-10 right-10 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(139,92,246,0.45), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── SecondaryCard ────────────────────────────────────────────────────────────

function SecondaryCard() {
  const variants = makeCardVariants(
    "0 6px 28px rgba(59,130,246,0.1), 0 2px 10px rgba(0,0,0,0.38)",
    "0 0 0 1px rgba(96,165,250,0.3), 0 16px 56px rgba(59,130,246,0.25), 0 4px 20px rgba(0,0,0,0.45)",
    { x: 18, rotate: 1.8 },
  );

  return (
    <motion.div
      variants={variants.entry}
      className="relative z-10 w-full rounded-3xl p-px"
      style={{
        boxShadow: "0 6px 28px rgba(59,130,246,0.1), 0 2px 10px rgba(0,0,0,0.38)",
        rotate: "1.8deg",
      }}
      initial="rest"
      whileHover="hovered"
      animate="rest"
    >
      {/* Gradient border shell */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.4] via-indigo-500/[0.12] to-transparent" />

      {/* Card body */}
      <motion.div
        className="relative h-full rounded-[calc(1.5rem-1px)] p-7"
        variants={variants.hover}
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 0%, rgba(37,99,235,0.2) 0%, transparent 60%), linear-gradient(160deg, rgba(10,12,38,0.98) 0%, rgba(8,10,30,0.99) 100%)",
        }}
      >
        {/* Icon badge */}
        <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/[0.2] to-indigo-600/[0.1] p-3">
          <ShieldCheck className="h-[18px] w-[18px] text-blue-400" strokeWidth={1.5} />
        </div>

        {/* Label */}
        <h3 className="mb-2.5 text-[15px] font-semibold tracking-tight text-white/88">
          DevSecOps as a Service
        </h3>

        {/* Description */}
        <p className="text-[13px] leading-relaxed text-white/38">
          Integrate security into your DevOps pipelines — shift left, automate compliance, and ship
          with confidence.
        </p>

        {/* Pill */}
        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-blue-500/[0.2] bg-blue-500/[0.08] px-3 py-1.5">
          <Lock className="h-2.5 w-2.5 text-blue-400" strokeWidth={2} />
          <span className="text-[11px] font-medium text-blue-300/80">Zero-trust by default</span>
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(96,165,250,0.38), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── VisualChip ───────────────────────────────────────────────────────────────

type ChipProps = {
  label: string;
  sub: string;
  color: string;
  delay: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

function VisualChip({ label, sub, color, delay, top, bottom, left, right }: ChipProps) {
  return (
    <motion.div
      className="absolute"
      style={{ top, bottom, left, right }}
      initial={{ opacity: 0, scale: 0.82 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.8 + delay * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        className="flex items-center gap-2.5 rounded-2xl border border-white/[0.08] px-4 py-2.5 backdrop-blur-md"
        style={{
          background: "rgba(10,10,28,0.72)",
          boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
      >
        <span
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <div>
          <p className="text-[11px] font-semibold leading-none text-white/80">{label}</p>
          <p className="mt-0.5 text-[9px] leading-none text-white/30">{sub}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── AbstractVisual ───────────────────────────────────────────────────────────

function AbstractVisual() {
  return (
    <div className="relative flex h-full min-h-[420px] w-full items-center justify-center">
      {/* Ambient blobs */}
      <motion.div
        className="absolute h-[340px] w-[340px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.28) 0%, rgba(79,70,229,0.12) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[240px] w-[280px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(37,99,235,0.08) 50%, transparent 70%)",
          filter: "blur(50px)",
          top: "10%",
          right: "5%",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute h-[180px] w-[200px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          filter: "blur(36px)",
          bottom: "8%",
          left: "10%",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute h-[280px] w-[280px] rounded-full border border-violet-500/[0.14]"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-[200px] w-[200px] rounded-full border border-blue-500/[0.12]"
        style={{ borderStyle: "dashed" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-[340px] w-[340px] rounded-full border border-indigo-500/[0.07]"
        animate={{ rotate: 180 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Central sphere */}
      <div className="relative z-10 flex h-20 w-20 items-center justify-center">
        <motion.div
          className="absolute h-20 w-20 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(167,139,250,0.9) 0%, rgba(99,102,241,0.6) 40%, rgba(37,99,235,0.3) 70%, transparent 100%)",
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-[130px] w-[130px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 65%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Floating chips */}
      <VisualChip
        label="Cost Saved"
        sub="Last 30 days"
        color="rgba(167,139,250,1)"
        delay={0.2}
        top="12%"
        left="4%"
      />
      <VisualChip
        label="0 Incidents"
        sub="Security posture"
        color="rgba(34,197,94,1)"
        delay={0.45}
        top="18%"
        right="2%"
      />
      <VisualChip
        label="99.98% Uptime"
        sub="SLA compliance"
        color="rgba(96,165,250,1)"
        delay={0.65}
        bottom="14%"
        right="6%"
      />
    </div>
  );
}

// ─── Offerings ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

export default function Offerings() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden px-6 py-28 sm:py-36"
      style={{
        background:
          "radial-gradient(ellipse 130% 80% at 10% 0%, #09131f 0%, #070d1c 40%, #050a16 70%, #060b18 100%)",
      }}
    >
      {/* Top edge fade — blends with Hero's bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#08101e] to-transparent" />

      {/* Section ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[1000px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-20 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.7) 0%, rgba(6,182,212,0.28) 55%, transparent 100%)",
        }}
      />

      {/* Bottom edge fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060813] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── Left: text block + card stack ── */}
          <div className="flex flex-col">
            {/* Eyebrow badge */}
            <motion.div
              className="mb-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-violet-400"
                  style={{ boxShadow: "0 0 6px rgba(167,139,250,0.9)" }}
                />
                What We Offer
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.08, ease: easeOutExpo }}
              className="mb-5"
            >
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                Intelligent Cloud{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Infrastructure,
                </span>
                <br />
                Built for Scale
              </h2>
            </motion.div>

            {/* Sub-description */}
            <motion.p
              className="mb-14 max-w-[420px] text-[15px] leading-relaxed text-white/38"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.18, ease: easeOutExpo }}
            >
              Everything your platform needs to run lean, stay secure, and scale
              effortlessly — unified under a single intelligent layer.
            </motion.p>

            {/* ── Stacked cards ── */}
            <motion.div
              className="relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Secondary card — sits behind, nudged up-right */}
              <div className="mb-[-60px] ml-auto w-[88%] sm:w-[76%]">
                <SecondaryCard />
              </div>

              {/* Primary card — in front */}
              <div className="relative z-20">
                <PrimaryCard />
              </div>
            </motion.div>
          </div>

          {/* ── Right: abstract visual ── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.25, ease: easeOutExpo }}
          >
            <AbstractVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
