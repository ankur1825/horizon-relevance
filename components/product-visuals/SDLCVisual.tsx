"use client";

import { motion } from "framer-motion";
import { GitBranch, Package, ShieldCheck, FileCheck2, Rocket } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const PRIMARY = "rgba(0,195,220,1)";
const SECONDARY = "rgba(99,102,241,1)";

const STAGES = [
  { icon: GitBranch,  label: "Source & Build",   sub: "Git repo · branch · unit tests",     color: "rgba(0,195,220,1)" },
  { icon: Package,    label: "Containerize",     sub: "Docker build · push to ECR",         color: "rgba(48,175,232,1)" },
  { icon: ShieldCheck,label: "Security Gates",   sub: "SAST · container/IaC · policy",      color: "rgba(80,140,245,1)" },
  { icon: FileCheck2, label: "Artifact Evidence",sub: "image.json · audit trail to S3",     color: "rgba(99,102,241,1)" },
  { icon: Rocket,     label: "Promote & Deploy", sub: "DEV → QA → STAGE → PROD",            color: "rgba(120,80,252,1)" },
];

const PROMOTION_STAGES = ["DEV", "QA", "STAGE", "PROD"];

function FlowParticle({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: 7, height: 7, background: color, boxShadow: `0 0 8px ${color}`, left: "50%", marginLeft: -3.5, top: 0, willChange: "transform, opacity" }}
      animate={{ y: [0, 340], opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, delay, ease: "linear", times: [0, 0.04, 0.92, 1] }}
    />
  );
}

const ISSUES = [
  { label: "SQL injection (critical)", severity: "critical" },
  { label: "Dep CVE-2024-0183 (medium)", severity: "medium" },
  { label: "Exposed secret in env (high)", severity: "high" },
];

const SEVERITY_COLOR: Record<string, string> = {
  critical: "rgba(248,113,113,0.9)",
  high:     "rgba(251,146,60,0.9)",
  medium:   "rgba(250,204,21,0.9)",
};

export default function SDLCVisual() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-0 px-6 py-10 md:flex-row md:items-stretch md:gap-10 md:px-14 md:py-12">

      {/* Left — vertical pipeline */}
      <div className="relative flex flex-col" style={{ minWidth: 200 }}>
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
          <FlowParticle delay={0}   color={PRIMARY} />
          <FlowParticle delay={1.7} color={SECONDARY} />
        </div>

        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.label}
            className="relative flex items-center gap-4 py-3.5"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
          >
            {/* Node */}
            <div
              className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08]"
              style={{
                background: `radial-gradient(circle, ${stage.color.replace("1)", "0.2)")} 0%, rgba(6,9,22,0.95) 100%)`,
              }}
            >
              <stage.icon className="h-4 w-4" style={{ color: stage.color }} strokeWidth={1.5} />
              <span
                className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-[rgba(6,9,22,0.9)] bg-emerald-400"
                style={{ boxShadow: "0 0 7px rgba(52,211,153,0.95)" }}
              />
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
        {/* Release status */}
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
                  className="rounded-md px-2 py-1 text-[9px] font-semibold text-cyan-300"
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

        {/* AI Remediation */}
        <div
          className="overflow-hidden rounded-2xl border p-4"
          style={{
            borderColor: "rgba(99,102,241,0.18)",
            background: "rgba(6,9,22,1)",
          }}
        >
          <p className="mb-3 text-[9px] font-medium uppercase tracking-widest text-white/22">AI Auto-remediation</p>
          {ISSUES.map((issue) => (
            <div key={issue.label} className="flex items-center gap-2.5 py-1.5">
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: SEVERITY_COLOR[issue.severity] }}
              />
              <span className="flex-1 font-mono text-[10px] text-white/35">{issue.label}</span>
              <span className="rounded px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400" style={{ background: "rgba(52,211,153,0.08)" }}>
                Fixed
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
