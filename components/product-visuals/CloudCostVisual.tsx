"use client";

import { motion } from "framer-motion";
import { TrendingDown, Cloud, Server, AlertCircle } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const PRIMARY   = "rgba(168,85,247,1)";
const SECONDARY = "rgba(124,58,237,1)";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

// budget height % · actual height %
const BARS = [
  { budget: 88, actual: 82 },
  { budget: 72, actual: 58 },
  { budget: 92, actual: 74 },
  { budget: 66, actual: 44 },
  { budget: 80, actual: 52 },
  { budget: 90, actual: 50 },
  { budget: 60, actual: 32 },
];

const RECOMMENDATIONS = [
  { icon: Server,       label: "5 oversized EC2",    action: "Rightsize → save $3,840/mo",  accent: PRIMARY   },
  { icon: Cloud,        label: "Idle S3 buckets (8)", action: "Archive → save $1,260/mo",   accent: SECONDARY },
  { icon: AlertCircle,  label: "Reserved capacity",   action: "Commit → save $6,100/mo",    accent: "rgba(200,80,230,1)" },
];

export default function CloudCostVisual() {
  return (
    <div className="flex flex-col gap-0 px-6 py-10 md:px-14 md:py-12">

      {/* Header row */}
      <motion.div
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/22">Cloud Spend Analysis</p>
          <p className="mt-0.5 text-xs text-white/38">Multi-cloud · All regions</p>
        </div>
        <div
          className="flex items-center gap-2 rounded-full border px-3 py-1.5"
          style={{ borderColor: "rgba(168,85,247,0.28)", background: "rgba(168,85,247,0.08)" }}
        >
          <TrendingDown className="h-3.5 w-3.5" style={{ color: PRIMARY }} />
          <span className="font-mono text-sm font-bold" style={{ color: PRIMARY }}>↓ 47%</span>
          <span className="text-[9px] text-white/30">avg savings</span>
        </div>
      </motion.div>

      {/* Bar chart */}
      <div className="mb-6">
        <div className="relative flex items-end gap-2" style={{ height: 100 }}>
          {BARS.map((bar, i) => (
            <div key={i} className="relative flex flex-1 flex-col items-center gap-0.5">
              {/* Budget bar (ghost) */}
              <motion.div
                className="absolute bottom-0 w-full rounded-t-sm"
                style={{ background: "rgba(255,255,255,0.06)", maxHeight: 90 }}
                initial={{ height: 0 }}
                animate={{ height: `${bar.budget}%` }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: easeOutExpo }}
              />
              {/* Actual bar */}
              <motion.div
                className="absolute bottom-0 w-full rounded-t-sm"
                style={{
                  background: `linear-gradient(to top, ${SECONDARY.replace("1)", "0.9)")}, ${PRIMARY.replace("1)", "0.7)")})`,
                  maxHeight: 90,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${bar.actual}%` }}
                transition={{ duration: 0.8, delay: i * 0.06 + 0.1, ease: easeOutExpo }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between px-0.5">
          {MONTHS.map((m) => (
            <span key={m} className="flex-1 text-center text-[9px] text-white/20">{m}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-3 rounded-sm" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-[9px] text-white/25">Budget</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-3 rounded-sm" style={{ background: PRIMARY.replace("1)", "0.7)") }} />
            <span className="text-[9px] text-white/25">Actual</span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <p className="mb-3 text-[9px] font-medium uppercase tracking-widest text-white/22">AI Recommendations</p>
        <div className="flex flex-col gap-2">
          {RECOMMENDATIONS.map((rec, i) => (
            <motion.div
              key={rec.label}
              className="flex items-center gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.6 + i * 0.12, ease: easeOutExpo }}
            >
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ background: rec.accent.replace("1)", "0.12)") }}
              >
                <rec.icon className="h-3.5 w-3.5" style={{ color: rec.accent }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white/62">{rec.label}</p>
                <p className="text-[10px] text-white/28">{rec.action}</p>
              </div>
              <div
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: rec.accent, boxShadow: `0 0 6px ${rec.accent}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Total savings */}
      <motion.div
        className="mt-4 flex items-center justify-between rounded-xl border px-5 py-3"
        style={{ borderColor: "rgba(168,85,247,0.22)", background: "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(168,85,247,0.08) 0%, transparent 60%), rgba(6,9,22,1)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs text-white/38">Projected monthly savings</span>
        <span className="font-mono text-xl font-bold" style={{ color: PRIMARY }}>$11,200</span>
      </motion.div>
    </div>
  );
}
