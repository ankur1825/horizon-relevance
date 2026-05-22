"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Grain ────────────────────────────────────────────────────────────────────
// Film-grain overlay: the single biggest contributor to "expensive feel".
// Uses stepped transform animation so it moves like actual film grain, not CSS.

function Grain() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundSize: "160px 160px",
        opacity: 0.1,
        mixBlendMode: "screen",
      }}
      animate={{
        backgroundPosition: [
          "0% 0%",
          "-5% -10%",
          "10% 5%",
          "-8% 12%",
          "4% -6%",
          "0% 0%",
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── Aurora ───────────────────────────────────────────────────────────────────
// Three slow-breathing light beams. Dark enough to not compete with type.

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {/* Primary — teal-green, wide, drifts slowly */}
      <motion.div
        className="absolute"
        style={{
          left: "-5%",
          top: "-15%",
          width: "70vw",
          height: "120vh",
          background:
            "radial-gradient(ellipse 50% 60% at 42% 38%, rgba(0,195,125,0.24) 0%, rgba(0,150,115,0.1) 45%, transparent 70%)",
          filter: "blur(85px)",
        }}
        animate={{ x: [0, 22, 0], y: [0, -14, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary — violet-blue, right side */}
      <motion.div
        className="absolute"
        style={{
          right: "-12%",
          top: "5%",
          width: "55vw",
          height: "85vh",
          background:
            "radial-gradient(ellipse 58% 52% at 52% 42%, rgba(100,70,215,0.2) 0%, rgba(65,50,175,0.08) 48%, transparent 70%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, -24, 0], opacity: [0.58, 0.9, 0.58] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Accent — small intense teal spot */}
      <motion.div
        className="absolute"
        style={{
          left: "22%",
          top: "28%",
          width: "30vw",
          height: "32vh",
          background:
            "radial-gradient(circle, rgba(0,225,150,0.17) 0%, transparent 62%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.48, 0.88, 0.48] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Floor — thin warm glow so black isn't total void */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[55vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,160,105,0.06) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Headline lines ───────────────────────────────────────────────────────────

const LINES = [
  { text: "Cloud", accent: false },
  { text: "Engineering,", accent: false },
  { text: "Intelligently", accent: true },
  { text: "Automated.", accent: false },
] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const { scrollY } = useScroll();

  // Headline drifts upward slightly — parallax depth
  const headlineY = useTransform(scrollY, [0, 650], [0, -85]);
  // Whole above-fold fades as you scroll into the next section
  const fadeOut = useTransform(scrollY, [0, 480], [1, 0]);

  return (
    <section
      id="intro"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
      style={{ background: "#040408" }}
    >
      <Grain />
      <Aurora />

      {/* ── Content layer ── */}
      <div className="relative z-[3] flex flex-1 flex-col px-8 pb-16 pt-28 sm:px-12 lg:px-16 xl:pl-44">

        {/* Top meta — whisper-quiet, anchors the brand */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.18 }}
        >
          <span
            className="font-mono uppercase text-white/22"
            style={{ fontSize: "9px", letterSpacing: "0.22em" }}
          >
            Cloud · AI · DevSecOps
          </span>
          <span
            className="hidden font-mono uppercase text-white/14 sm:block"
            style={{ fontSize: "9px", letterSpacing: "0.2em" }}
          >
            Woodbridge, NJ — Est. 2024
          </span>
        </motion.div>

        {/* ── GIANT HEADLINE — the whole visual statement ── */}
        <motion.div
          className="my-auto flex-1 py-10"
          style={{ y: headlineY, opacity: fadeOut }}
        >
          <h1
            className="font-extrabold"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              lineHeight: 0.91,
              letterSpacing: "-0.03em",
            }}
          >
            {LINES.map((line, i) => (
              <div key={i} className="overflow-hidden pb-[0.06em]">
                <motion.div
                  initial={{ y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.92,
                    delay: 0.48 + i * 0.12,
                    ease: easeOutExpo,
                  }}
                >
                  {line.accent ? (
                    <span
                      className="block"
                      style={{
                        backgroundImage:
                          "linear-gradient(92deg, rgb(0,218,138) 0%, rgb(0,192,208) 52%, rgb(72,138,255) 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                      }}
                    >
                      {line.text}
                    </span>
                  ) : (
                    <span className="block text-white">{line.text}</span>
                  )}
                </motion.div>
              </div>
            ))}
          </h1>
        </motion.div>

        {/* ── Bottom row — grounded, minimal ── */}
        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 1.08, ease: easeOutExpo }}
        >
          <p
            className="max-w-[280px] leading-relaxed text-white/32"
            style={{ fontSize: "13px" }}
          >
            Next-gen cloud solutions to optimize, automate, and scale — powered by AI, built for engineering teams.
          </p>

          <div className="flex items-center gap-3">
            <motion.a
              href="#platform"
              className="inline-flex cursor-pointer items-center rounded-full border border-white/[0.12] px-6 py-2.5 text-sm font-medium text-white/62 backdrop-blur-sm"
              whileHover={{
                borderColor: "rgba(0,200,135,0.38)",
                color: "rgba(255,255,255,0.95)",
                backgroundColor: "rgba(0,200,135,0.07)",
              }}
              transition={{ duration: 0.2, ease }}
            >
              Explore Platform
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex cursor-pointer items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold"
              style={{ color: "#040408" }}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgb(210,255,240)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease }}
            >
              Book a Demo
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll pulse ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div style={{ opacity: fadeOut }}>
          <motion.div
            className="h-10 w-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,200,130,0.7), rgba(0,200,130,0))",
            }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.9,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.4,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
