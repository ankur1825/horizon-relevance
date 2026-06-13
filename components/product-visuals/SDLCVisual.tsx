"use client";

import { motion } from "framer-motion";
import {
  KeyRound, GitBranch, Hammer, Package, FileCheck2, ShieldCheck, GitMerge, Eye, ChevronRight, ChevronDown,
} from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const STAGES = [
  { icon: KeyRound,    label: "License & Environment Ready",  sub: "Trial/Enterprise sync · Environment catalog · Access preflight",         color: "rgba(0,195,220,1)" },
  { icon: GitBranch,   label: "Source Request",                sub: "Git repo · Branch · Project type · Target DEV",                          color: "rgba(20,190,216,1)" },
  { icon: Hammer,      label: "Build & Unit Test",             sub: "Compile · Unit tests · Dependency install",                               color: "rgba(40,182,224,1)" },
  { icon: Package,     label: "Containerize & Publish",        sub: "Docker build · Short SHA tag · Push to client ECR",                      color: "rgba(58,170,232,1)" },
  { icon: FileCheck2,  label: "Artifact Evidence",             sub: "image.json · templateconfiguration.json · Client S3",                    color: "rgba(76,150,240,1)" },
  { icon: ShieldCheck, label: "Validation & Security Gates",   sub: "UI · API · Performance · Code quality · SAST · Container/IaC · Policy",  color: "rgba(94,128,246,1)" },
  { icon: GitMerge,    label: "Release Promotion",             sub: "Same image digest · Approval gates",                                      color: "rgba(110,108,248,1)" },
  { icon: Eye,         label: "Deploy & Observe",              sub: "EKS namespace deploy · Findings dashboard · Audit logs · Notifications",  color: "rgba(120,80,252,1)" },
];

const PROMOTION_STAGES = ["DEV", "QA", "STAGE", "PROD"];

export default function SDLCVisual() {
  return (
    <div className="relative px-5 py-8 sm:px-8 sm:py-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-5">
        {STAGES.map((stage, i) => {
          const isEndOfRow = i % 4 === 3;
          const isLast = i === STAGES.length - 1;

          return (
            <motion.div
              key={stage.label}
              className="relative flex flex-col gap-2 rounded-2xl border border-white/[0.07] p-3.5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: easeOutExpo }}
              style={{
                background: `radial-gradient(circle at 15% 0%, ${stage.color.replace("1)", "0.1)")} 0%, rgba(6,9,22,0.9) 70%)`,
              }}
            >
              <div className="flex items-center justify-between gap-2.5">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08]"
                  style={{ background: stage.color.replace("1)", "0.14)") }}
                >
                  <stage.icon className="h-3.5 w-3.5" style={{ color: stage.color }} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10px] font-bold tabular-nums text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-[12px] font-semibold leading-snug text-white/85">{stage.label}</p>
              <p className="text-[10px] leading-relaxed text-white/30">{stage.sub}</p>

              {stage.label === "Release Promotion" && (
                <div className="mt-0.5 flex flex-wrap items-center gap-1">
                  {PROMOTION_STAGES.map((p, j) => (
                    <div key={p} className="flex items-center gap-1">
                      <span
                        className="rounded px-1.5 py-0.5 text-[8px] font-semibold"
                        style={{
                          background: j === PROMOTION_STAGES.length - 1 ? "rgba(52,211,153,0.14)" : "rgba(99,102,241,0.12)",
                          color: j === PROMOTION_STAGES.length - 1 ? "rgba(52,211,153,0.95)" : "rgba(165,180,252,0.95)",
                        }}
                      >
                        {p}
                      </span>
                      {j < PROMOTION_STAGES.length - 1 && <span className="text-[8px] text-white/20">→</span>}
                    </div>
                  ))}
                </div>
              )}

              {/* Flow connectors */}
              {!isLast && !isEndOfRow && (
                <div className="absolute -right-[18px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[#070b1a] sm:flex">
                  <ChevronRight className="h-3 w-3 text-white/25" strokeWidth={1.5} />
                </div>
              )}
              {!isLast && isEndOfRow && (
                <div className="absolute -bottom-[18px] left-1/2 z-10 hidden h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[#070b1a] sm:flex">
                  <ChevronDown className="h-3 w-3 text-white/25" strokeWidth={1.5} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
