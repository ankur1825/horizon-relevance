"use client";

import { motion } from "framer-motion";
import {
  KeyRound, GitBranch, Hammer, Package, FileCheck2, ShieldCheck, GitMerge, Eye,
} from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const PRIMARY = "rgba(0,195,220,1)";
const SECONDARY = "rgba(120,80,252,1)";

const STAGES = [
  { icon: KeyRound,    label: "License & Environment Ready", sub: "Trial/Enterprise sync · Access preflight",       color: "rgba(0,195,220,1)" },
  { icon: GitBranch,   label: "Source Request",              sub: "Git repo · Branch · Target DEV",                  color: "rgba(20,190,216,1)" },
  { icon: Hammer,      label: "Build & Unit Test",           sub: "Compile · Unit tests · Dependencies",             color: "rgba(40,182,224,1)" },
  { icon: Package,     label: "Containerize & Publish",      sub: "Docker build · Push to client ECR",               color: "rgba(58,170,232,1)" },
  { icon: FileCheck2,  label: "Artifact Evidence",           sub: "image.json · Client S3",                          color: "rgba(76,150,240,1)" },
  { icon: ShieldCheck, label: "Validation & Security Gates", sub: "SAST · Container/IaC · Policy · Code quality",    color: "rgba(94,128,246,1)" },
  { icon: GitMerge,    label: "Release Promotion",           sub: "Same image digest · Approval gates",              color: "rgba(110,108,248,1)" },
  { icon: Eye,         label: "Deploy & Observe",            sub: "EKS deploy · Findings dashboard · Audit logs",    color: "rgba(120,80,252,1)" },
];

const PROMOTION_STAGES = ["DEV", "QA", "STAGE", "PROD"];

function FlowParticle({ delay, color, trackLength }: { delay: number; color: string; trackLength: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: 7, height: 7, background: color, boxShadow: `0 0 8px ${color}`, left: "50%", marginLeft: -3.5, top: 0, willChange: "transform, opacity" }}
      animate={{ y: [0, trackLength], opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: 5.6, repeat: Infinity, delay, ease: "linear", times: [0, 0.04, 0.92, 1] }}
    />
  );
}

export default function SDLCVisual() {
  const trackLength = (STAGES.length - 1) * 64;

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 px-6 py-10 md:flex-row md:items-stretch md:gap-10 md:px-14 md:py-12">

      {/* Left — vertical pipeline */}
      <div className="relative flex flex-col" style={{ minWidth: 220 }}>
        {/* Spine gradient line */}
        <div
          className="absolute w-px"
          style={{
            left: 19,
            top: 26,
            bottom: 26,
            background: `linear-gradient(to bottom, ${PRIMARY.replace("1)", "0.45)")}, ${SECONDARY.replace("1)", "0.45)")})`,
          }}
        />

        {/* Particle track */}
        <div className="pointer-events-none absolute overflow-visible" style={{ left: 19, top: 26, bottom: 26, width: 0 }}>
          <FlowParticle delay={0}    color={PRIMARY} trackLength={trackLength} />
          <FlowParticle delay={2.8}  color={SECONDARY} trackLength={trackLength} />
        </div>

        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.label}
            className="relative flex items-center gap-4 py-3"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: easeOutExpo }}
          >
            {/* Node */}
            <div
              className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08]"
              style={{
                background: `radial-gradient(circle, ${stage.color.replace("1)", "0.2)")} 0%, rgba(6,9,22,0.95) 100%)`,
              }}
            >
              <stage.icon className="h-4 w-4" style={{ color: stage.color }} strokeWidth={1.5} />
              {i === STAGES.length - 1 && (
                <span
                  className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-[rgba(6,9,22,0.9)] bg-emerald-400"
                  style={{ boxShadow: "0 0 7px rgba(52,211,153,0.95)" }}
                />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold leading-none text-white/82">{stage.label}</p>
              <p className="mt-1 text-[11px] text-white/28">{stage.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right — summary cards */}
      <motion.div
        className="hidden flex-1 flex-col justify-center gap-3.5 md:flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: easeOutExpo }}
      >
        {/* Release promotion */}
        <div
          className="overflow-hidden rounded-2xl border p-5"
          style={{
            borderColor: "rgba(0,195,220,0.18)",
            background: "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(0,195,220,0.08) 0%, transparent 60%), rgba(6,9,22,1)",
          }}
        >
          <p className="mb-1 text-[9px] font-medium uppercase tracking-widest text-white/22">Last Release</p>
          <p className="text-2xl font-bold text-white/85">0 vulnerabilities</p>
          <p className="mt-1 text-[10px] text-white/25">Same signed image digest promoted across all stages</p>

          {/* Release promotion pipeline */}
          <div className="mt-3.5 flex items-center gap-1.5">
            {PROMOTION_STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-1.5">
                <span
                  className="rounded-md px-2 py-1 text-[9px] font-semibold"
                  style={{
                    background: i === PROMOTION_STAGES.length - 1 ? "rgba(52,211,153,0.12)" : "rgba(0,195,220,0.1)",
                    color: i === PROMOTION_STAGES.length - 1 ? "rgba(52,211,153,0.95)" : "rgba(103,232,249,0.95)",
                  }}
                >
                  {stage}
                </span>
                {i < PROMOTION_STAGES.length - 1 && <span className="text-[10px] text-white/20">→</span>}
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            {["HIPAA", "SOC 2", "PCI-DSS"].map((tag) => (
              <span key={tag} className="rounded-md px-2 py-0.5 text-[9px] font-semibold text-cyan-300" style={{ background: "rgba(0,195,220,0.1)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Validation & security gates */}
        <div
          className="overflow-hidden rounded-2xl border p-4"
          style={{
            borderColor: "rgba(99,102,241,0.18)",
            background: "rgba(6,9,22,1)",
          }}
        >
          <p className="mb-3 text-[9px] font-medium uppercase tracking-widest text-white/22">Validation & Security Gates</p>
          <div className="flex flex-wrap gap-1.5">
            {["UI", "API", "Performance", "Code Quality", "SAST", "Container/IaC", "Policy"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-medium text-white/45"
                style={{ background: "rgba(99,102,241,0.08)" }}
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "rgba(52,211,153,0.95)" }} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
