"use client";

import { motion } from "framer-motion";
import { CloudUpload, GitMerge, BarChart3, Bot, Zap, FileCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

type Service = {
  number: string;
  icon: LucideIcon;
  label: string;
  description: string;
  accent: string;
  glow: string;
  iconClass: string;
  iconBg: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    icon: CloudUpload,
    label: "Cloud Strategy & Migration",
    description:
      "Cloud readiness assessments, migration roadmaps, and multi-cloud architecture design — built around your team's velocity.",
    accent: "rgba(80,100,245,0.55)",
    glow: "rgba(80,100,245,0.12)",
    iconClass: "text-indigo-400",
    iconBg: "from-indigo-500/[0.2] to-blue-700/[0.08]",
  },
  {
    number: "02",
    icon: GitMerge,
    label: "DevSecOps as a Service",
    description:
      "Automated CI/CD pipelines with integrated security tools, policy gates, and compliance checks at every merge.",
    accent: "rgba(120,60,235,0.55)",
    glow: "rgba(120,60,235,0.12)",
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.2] to-purple-700/[0.08]",
  },
  {
    number: "03",
    icon: BarChart3,
    label: "AI & Data Science Consulting",
    description:
      "Data pipeline design, feature engineering, and predictive analytics using LLMs and cloud-native ML infrastructure.",
    accent: "rgba(35,130,225,0.55)",
    glow: "rgba(35,130,225,0.12)",
    iconClass: "text-blue-400",
    iconBg: "from-blue-500/[0.2] to-cyan-700/[0.08]",
  },
  {
    number: "04",
    icon: Bot,
    label: "Generative AI Enablement",
    description:
      "RAG pipelines, LLM-based automation, and AI-powered workflows that plug directly into your existing product stack.",
    accent: "rgba(155,50,245,0.55)",
    glow: "rgba(155,50,245,0.12)",
    iconClass: "text-fuchsia-400",
    iconBg: "from-fuchsia-500/[0.2] to-violet-700/[0.08]",
  },
  {
    number: "05",
    icon: Zap,
    label: "Serverless Application Framework",
    description:
      "Build and deploy event-driven applications with AWS Lambda and Step Functions — zero infrastructure overhead.",
    accent: "rgba(30,115,255,0.55)",
    glow: "rgba(30,115,255,0.12)",
    iconClass: "text-sky-400",
    iconBg: "from-sky-500/[0.2] to-blue-700/[0.08]",
  },
  {
    number: "06",
    icon: FileCheck,
    label: "Cloud Governance & Cost Compliance",
    description:
      "Budgets, guardrails, tagging policies, and cost control dashboards across every cloud environment you run.",
    accent: "rgba(100,125,245,0.55)",
    glow: "rgba(100,125,245,0.12)",
    iconClass: "text-periwinkle-400",
    iconBg: "from-indigo-400/[0.2] to-blue-600/[0.08]",
  },
];

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const { number, icon: Icon, label, description, accent, glow, iconClass, iconBg } = service;

  return (
    <motion.div
      className="group relative rounded-3xl p-px"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.78, delay, ease: easeOutExpo }}
      whileHover={{ y: -5, transition: { duration: 0.24, ease } }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`,
        }}
      />

      {/* Card body */}
      <div
        className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-7"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 12% 0%, ${glow} 0%, transparent 52%), rgba(6,8,24,0.97)`,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Ambient hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 18% 8%, ${glow.replace(/[\d.]+\)$/, "0.2)")} 0%, transparent 65%)`,
          }}
        />

        {/* Watermark number */}
        <span
          className="pointer-events-none absolute right-6 top-5 select-none font-mono font-black leading-none tracking-tighter text-white/[0.035]"
          style={{ fontSize: "clamp(44px,7vw,72px)" }}
        >
          {number}
        </span>

        {/* Icon */}
        <div className={`mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br p-3 ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={1.5} />
        </div>

        {/* Label */}
        <h3 className="mb-3 text-[1.05rem] font-bold leading-snug tracking-tight text-white/90">
          {label}
        </h3>

        {/* Description */}
        <p className="text-[13px] leading-relaxed text-white/40">{description}</p>

        {/* Bottom accent on hover */}
        <div
          className="absolute bottom-0 left-7 right-7 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

// ─── Solutions ────────────────────────────────────────────────────────────────

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{
        background:
          "radial-gradient(ellipse 150% 80% at 70% 0%, #0f1238 0%, #060818 48%, #030612 100%)",
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

      {/* Indigo bloom — right-top */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          right: "-8%", top: "-8%", width: "68vw", height: "88vh",
          background: "radial-gradient(ellipse 52% 55% at 55% 40%, rgba(80,90,245,0.26) 0%, rgba(60,65,210,0.1) 46%, transparent 68%)",
          filter: "blur(115px)",
        }}
        animate={{ x: [0, -28, 0], y: [0, 16, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sapphire — left-center */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "-6%", top: "18%", width: "55vw", height: "72vh",
          background: "radial-gradient(ellipse 54% 48% at 44% 44%, rgba(35,85,230,0.2) 0%, rgba(25,65,200,0.08) 52%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, 22, 0], opacity: [0.55, 0.88, 0.55] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
      />

      {/* Violet-blue accent — bottom */}
      <motion.div
        className="pointer-events-none absolute z-[0]"
        style={{
          left: "25%", bottom: "10%", width: "38vw", height: "42vh",
          background: "radial-gradient(circle, rgba(110,40,215,0.15) 0%, transparent 62%)",
          filter: "blur(88px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.72, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Top edge — from Products */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#05081a] to-transparent" />
      {/* Bottom edge — into Industries */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-36 bg-gradient-to-t from-[#051a0a] to-transparent" />

      <div className="relative z-[3] mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          className="mb-16 text-center sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                style={{ boxShadow: "0 0 6px rgba(100,120,255,0.9)" }}
              />
              What We Do
            </div>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-indigo-400 via-violet-300 to-blue-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Services
            </motion.span>
          </h2>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/34"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeOutExpo }}
          >
            Six core service lines — each purpose-built for teams that can't afford to slow down
            while they modernize.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              delay={(i % 3) * 0.09 + Math.floor(i / 3) * 0.05}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
