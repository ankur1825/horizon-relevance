"use client";

import { motion } from "framer-motion";

// ─── Easing — matches Navbar ───────────────────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.6,
    },
  },
};

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

// ─── Primary Button ───────────────────────────────────────────────────────────

function PrimaryButton({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="relative inline-flex cursor-pointer select-none items-center overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      variants={{
        rest: {
          scale: 1,
          boxShadow: "0 2px 20px rgba(99, 102, 241, 0.3)",
        },
        hover: {
          scale: 1.03,
          boxShadow:
            "0 0 36px rgba(139, 92, 246, 0.65), 0 0 72px rgba(99, 102, 241, 0.25), 0 4px 20px rgba(0,0,0,0.3)",
        },
      }}
      transition={{ duration: 0.25, ease }}
    >
      {/* Shimmer sweep */}
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent"
        variants={{
          rest: { x: "-120%" },
          hover: { x: "140%" },
        }}
        transition={{ duration: 0.55, ease }}
      />
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

// ─── Ghost Button ─────────────────────────────────────────────────────────────

function GhostButton({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="inline-flex cursor-pointer select-none items-center rounded-full border border-white/[0.12] px-7 py-3.5 text-sm font-semibold text-white/60 backdrop-blur-sm transition-colors duration-300 hover:text-white/95"
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

// ─── Aurora Background ────────────────────────────────────────────────────────

function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:38px_38px]" />

      {/* Violet orb — top left */}
      <motion.div
        className="absolute -left-[15%] -top-[20%] h-[70vh] w-[65vw] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(109,40,217,0.2) 0%, rgba(99,102,241,0.1) 45%, transparent 70%)",
        }}
        animate={{
          x: [0, 28, -18, 0],
          y: [0, -20, 32, 0],
          scale: [1, 1.07, 0.96, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan orb — top right */}
      <motion.div
        className="absolute -right-[10%] -top-[15%] h-[60vh] w-[55vw] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, -38, 16, 0],
          y: [0, 26, -22, 0],
          scale: [1, 0.93, 1.08, 1],
        }}
        transition={{
          duration: 27,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Purple orb — bottom center */}
      <motion.div
        className="absolute -bottom-[25%] left-[20%] h-[55vh] w-[55vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 65%)",
        }}
        animate={{
          scale: [1, 1.12, 0.93, 1],
          x: [0, 22, -12, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 9,
        }}
      />

      {/* Radial vignette — darkens edges, focuses center */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_35%,rgba(8,8,14,0.75)_100%)]" />
    </div>
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      variants={revealVariants}
      className="mt-24 flex flex-col items-center gap-2.5"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/20">
        Scroll to explore
      </span>
      <motion.div
        className="h-9 w-px bg-gradient-to-b from-white/25 to-transparent"
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08080e] px-6">
      <AuroraBackground />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow badge */}
        <motion.div variants={revealVariants} className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium tracking-widest text-white/45 backdrop-blur-sm uppercase">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-violet-400"
              style={{
                boxShadow: "0 0 8px rgba(167,139,250,0.9)",
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            Next-Generation Enterprise Platform
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={revealVariants}
          className="mb-7 text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[76px]"
        >
          Empowering the Future
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            with Cloud, AI &amp; DevSecOps
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={revealVariants}
          className="mx-auto mb-11 max-w-[38rem] text-lg leading-relaxed text-white/40 sm:text-xl"
        >
          We build next-gen cloud solutions to optimize, automate, and scale
          your business — with intelligence at every layer.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={revealVariants}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <PrimaryButton label="Explore Solutions" href="#solutions" />
          <GhostButton label="Contact Us" href="#contact" />
        </motion.div>

        {/* Scroll hint */}
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
