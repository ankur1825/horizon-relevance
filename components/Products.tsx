"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Layers,
  Zap,
  BrainCircuit,
  GitBranch,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Activity,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Easing ───────────────────────────────────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type UseCase = { industry: string; result: string };

type Product = {
  number: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  features: string[];
  useCases: UseCase[];
  idealFor: string[];
  cta: string;
  glowColor: string;
  borderGlow: string;
  iconClass: string;
  iconBg: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    number: "01",
    icon: Cloud,
    name: "Cloud Cost Optimization Platform",
    tagline: "Maximize cloud efficiency. Minimize spend. No guesswork.",
    features: [
      "Real-Time Dashboards",
      "AI-powered Savings Recommendations",
      "Budget Guardrails",
      "Multi-Cloud Support",
      "Cloud Billing API integration",
    ],
    useCases: [
      { industry: "FinTech", result: "Saved 37% on AWS within 2 weeks" },
      {
        industry: "Healthcare",
        result: "Reduced 40% infrastructure waste with AI scaling",
      },
    ],
    idealFor: ["FinOps", "Engineering", "Multi-cloud operations"],
    cta: "Start Free Assessment",
    glowColor: "rgba(6,182,212,0.11)",
    borderGlow: "rgba(6,182,212,0.48)",
    iconClass: "text-cyan-400",
    iconBg: "from-cyan-500/[0.18] to-blue-600/[0.08]",
  },
  {
    number: "02",
    icon: Layers,
    name: "Multi-Cloud Deployment Manager",
    tagline: "One dashboard. Any cloud. Everywhere.",
    features: [
      "GitOps-ready pipeline integration",
      "Dynamic config loader",
      "Helm + Terraform modules",
      "Cost-aware deployments",
    ],
    useCases: [
      { industry: "Healthcare", result: "EKS + AKS via Terraform, no friction" },
      { industry: "Enterprise", result: "Cloud onboarding: 3 days → 1 hour" },
    ],
    idealFor: ["Platform Engineering", "SREs", "DevOps teams"],
    cta: "Book a Demo",
    glowColor: "rgba(139,92,246,0.11)",
    borderGlow: "rgba(139,92,246,0.48)",
    iconClass: "text-violet-400",
    iconBg: "from-violet-500/[0.18] to-purple-600/[0.08]",
  },
  {
    number: "03",
    icon: Zap,
    name: "Serverless Application Framework",
    tagline: "Build faster. Scale smarter. Operate serverlessly.",
    features: [
      "Python-first Lambda deployment",
      "Event orchestration via Step Functions",
      "CloudWatch alerting and monitoring",
      "API Gateway with secure auto-docs",
      "Terraform & SAM support",
    ],
    useCases: [
      { industry: "Retail", result: "2M invocations, zero downtime" },
      { industry: "Healthcare", result: "HIPAA-compliant Lambda workflows" },
    ],
    idealFor: ["DevOps", "Startups", "Event-driven apps"],
    cta: "Deploy Your First Function",
    glowColor: "rgba(99,102,241,0.11)",
    borderGlow: "rgba(99,102,241,0.48)",
    iconClass: "text-indigo-300",
    iconBg: "from-indigo-500/[0.18] to-violet-600/[0.08]",
  },
  {
    number: "04",
    icon: BrainCircuit,
    name: "AI-Driven Monitoring & Incident Response",
    tagline: "Predict issues. Solve outages. Stay ahead with AI.",
    features: [
      "Generative AI Alerting & RCA",
      "Anomaly Detection & Forecasting",
      "OpenTelemetry + Grafana Tempo integration",
      "CloudWatch metrics & Lambda triggers",
      "Slack + ServiceNow integration",
    ],
    useCases: [
      { industry: "Healthcare", result: "65% faster incident response" },
      {
        industry: "Finance",
        result: "99.99% uptime with AI-powered remediation",
      },
    ],
    idealFor: ["SREs", "DevOps", "Regulated industries"],
    cta: "Explore AI Monitoring",
    glowColor: "rgba(59,130,246,0.11)",
    borderGlow: "rgba(59,130,246,0.48)",
    iconClass: "text-blue-400",
    iconBg: "from-blue-500/[0.18] to-indigo-600/[0.08]",
  },
  {
    number: "05",
    icon: GitBranch,
    name: "Self-Service CI/CD Pipeline UI",
    tagline: "Deploy in one click. Zero scripts, maximum control.",
    features: [
      "No-code Jenkins pipeline creation",
      "GitHub webhook-based triggering",
      "Integrated SonarQube and OPA scanning",
      "LDAP-based access and audit trail",
      "Kubernetes-native deployment",
    ],
    useCases: [
      { industry: "Healthcare", result: "3× faster developer deployments" },
      {
        industry: "Enterprise",
        result: "75% reduction in manual security reviews",
      },
    ],
    idealFor: ["DevOps", "DevSecOps", "Kubernetes-first teams"],
    cta: "Try Self-Service Pipeline",
    glowColor: "rgba(34,197,94,0.09)",
    borderGlow: "rgba(34,197,94,0.42)",
    iconClass: "text-emerald-400",
    iconBg: "from-emerald-500/[0.18] to-teal-600/[0.08]",
  },
];

// ─── Product Visuals ──────────────────────────────────────────────────────────

// 01 — animated cost bar chart
function CostVisual({ animKey }: { animKey: number }) {
  const bars = [
    { h: 68, prev: 92 },
    { h: 45, prev: 78 },
    { h: 82, prev: 88 },
    { h: 38, prev: 70 },
    { h: 55, prev: 80 },
    { h: 72, prev: 95 },
    { h: 35, prev: 62 },
  ];
  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-widest text-white/25">
          Monthly Cloud Spend
        </span>
        <div className="flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-300">
          <TrendingDown className="h-3 w-3" />
          ↓ 47% avg
        </div>
      </div>
      <div className="flex flex-1 items-end gap-2">
        {bars.map((bar, i) => (
          <div key={i} className="flex flex-1 flex-col gap-1">
            {/* Previous spend (dim) */}
            <motion.div
              key={`prev-${animKey}`}
              className="w-full rounded-t bg-white/[0.05]"
              initial={{ height: 0 }}
              animate={{ height: `${bar.prev}%` }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: easeOutExpo }}
              style={{ maxHeight: 90 }}
            />
            {/* Current spend (colored) */}
            <motion.div
              key={`cur-${animKey}`}
              className="absolute w-full rounded-t bg-gradient-to-t from-cyan-600/70 to-cyan-400/50"
              initial={{ height: 0 }}
              animate={{ height: `${bar.h}%` }}
              transition={{ duration: 0.8, delay: i * 0.06 + 0.1, ease: easeOutExpo }}
              style={{ maxHeight: 90 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-[9px] text-white/20">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

// 02 — multi-cloud node graph
function CloudNodesVisual({ animKey }: { animKey: number }) {
  const nodes = [
    { label: "AWS", top: "20%", left: "12%", color: "rgba(255,153,0,0.9)" },
    { label: "GCP", top: "10%", left: "50%", color: "rgba(66,133,244,0.9)" },
    { label: "Azure", top: "20%", right: "12%", color: "rgba(0,120,212,0.9)" },
    { label: "K8s", bottom: "20%", left: "25%", color: "rgba(50,170,240,0.9)" },
    { label: "Terraform", bottom: "20%", right: "25%", color: "rgba(95,71,206,0.9)" },
  ] as const;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Central hub */}
      <motion.div
        key={animKey}
        className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-900/40 backdrop-blur-sm"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute h-full w-full rounded-2xl border border-violet-400/20"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <span className="text-[10px] font-bold text-violet-300">HRel</span>
        <span className="text-[8px] text-violet-400/60">Hub</span>
      </motion.div>

      {/* Satellite nodes */}
      {nodes.map((node, i) => {
        const pos: React.CSSProperties = {
          top: "top" in node ? node.top : undefined,
          bottom: "bottom" in node ? node.bottom : undefined,
          left: "left" in node ? node.left : undefined,
          right: "right" in node ? node.right : undefined,
        };
        return (
          <motion.div
            key={`${node.label}-${animKey}`}
            className="absolute flex flex-col items-center gap-1"
            style={pos}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: i * 0.1 + 0.2 }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[10px] font-semibold text-white/70"
              style={{ boxShadow: `0 0 12px ${node.color}40` }}
            >
              {node.label}
            </div>
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: node.color }}
              animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// 03 — serverless invocation feed
const LAMBDA_FNS = [
  { name: "handler.py", ms: "28ms", inv: "812K" },
  { name: "process.py", ms: "54ms", inv: "403K" },
  { name: "notify.py", ms: "12ms", inv: "1.1M" },
  { name: "validate.py", ms: "19ms", inv: "622K" },
];

function ServerlessVisual({ animKey }: { animKey: number }) {
  return (
    <div className="flex flex-col gap-2.5 p-5">
      {LAMBDA_FNS.map((fn, i) => (
        <motion.div
          key={`${fn.name}-${animKey}`}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: easeOutExpo }}
        >
          <div
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400"
            style={{ boxShadow: "0 0 6px rgba(99,102,241,0.9)" }}
          />
          <span className="flex-1 font-mono text-xs text-white/60">{fn.name}</span>
          <span className="font-mono text-[10px] text-white/30">{fn.ms}</span>
          <span className="font-mono text-[10px] font-semibold text-indigo-300/80">
            {fn.inv}
          </span>
        </motion.div>
      ))}
      <motion.div
        key={`total-${animKey}`}
        className="mt-1 flex items-center justify-between rounded-xl border border-indigo-500/[0.18] bg-indigo-500/[0.06] px-4 py-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs text-white/35">Total invocations</span>
        <span className="font-mono text-xs font-bold text-indigo-300">2.1M / 0 errors</span>
      </motion.div>
    </div>
  );
}

// 04 — AI monitoring heartbeat + alerts
function MonitorVisual({ animKey }: { animKey: number }) {
  return (
    <div className="flex flex-col gap-3 p-5">
      {/* Heartbeat */}
      <motion.div
        key={`hb-${animKey}`}
        className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="mb-2 block text-[9px] uppercase tracking-widest text-white/22">
          System Health
        </span>
        <svg viewBox="0 0 220 48" className="h-10 w-full overflow-visible">
          <motion.path
            key={animKey}
            d="M0,24 L38,24 L48,4 L58,44 L68,24 L90,24 L100,12 L110,36 L120,24 L148,24 L158,6 L168,42 L178,24 L220,24"
            fill="none"
            stroke="rgba(59,130,246,0.75)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute right-4 top-4 flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,1)" }}
          />
          <span className="text-[9px] font-semibold text-emerald-400">99.99% uptime</span>
        </div>
      </motion.div>

      {/* Alert feed */}
      {[
        { msg: "Anomaly detected — auto-remediated", time: "2m ago", Icon: Activity, color: "text-yellow-400" },
        { msg: "RCA complete — root cause isolated", time: "5m ago", Icon: CheckCircle2, color: "text-blue-400" },
        { msg: "Incident resolved via AI playbook", time: "11m ago", Icon: CheckCircle2, color: "text-emerald-400" },
      ].map((alert, i) => (
        <motion.div
          key={`${alert.msg}-${animKey}`}
          className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + i * 0.12, ease: easeOutExpo }}
        >
          <alert.Icon className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${alert.color}`} strokeWidth={2} />
          <div>
            <p className="text-xs text-white/65">{alert.msg}</p>
            <p className="mt-0.5 text-[9px] text-white/25">{alert.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// 05 — CI/CD pipeline flow
const PIPELINE_STAGES = [
  { label: "Build", color: "emerald" },
  { label: "Test", color: "emerald" },
  { label: "Scan", color: "emerald" },
  { label: "Deploy", color: "emerald" },
] as const;

function PipelineVisual({ animKey }: { animKey: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      {/* Stages */}
      <div className="flex w-full items-center justify-between">
        {PIPELINE_STAGES.map((stage, i) => (
          <div key={stage.label} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center">
              <motion.div
                key={`${stage.label}-${animKey}`}
                className="flex h-10 w-full max-w-[68px] items-center justify-center rounded-xl border border-emerald-500/[0.22] bg-emerald-500/[0.08] text-[11px] font-semibold text-emerald-300"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, ease: easeOutExpo }}
              >
                {stage.label}
              </motion.div>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <motion.div
                key={`line-${i}-${animKey}`}
                className="h-px flex-1 bg-gradient-to-r from-emerald-500/40 to-emerald-400/15"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ delay: i * 0.15 + 0.12, duration: 0.35 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid w-full grid-cols-2 gap-3">
        {[
          { value: "3×", label: "faster deployments" },
          { value: "75%", label: "fewer manual reviews" },
        ].map((stat) => (
          <motion.div
            key={`${stat.label}-${animKey}`}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ease: easeOutExpo }}
          >
            <p className="font-mono text-xl font-bold text-emerald-300">{stat.value}</p>
            <p className="mt-0.5 text-[10px] text-white/28">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Commit feed */}
      {["feat: add cost guardrails", "fix: lambda timeout config", "ci: OPA policy updated"].map(
        (commit, i) => (
          <motion.div
            key={`${commit}-${animKey}`}
            className="flex w-full items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            <div className="h-1 w-1 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] text-white/38">{commit}</span>
          </motion.div>
        ),
      )}
    </div>
  );
}

function ProductVisual({ index, animKey }: { index: number; animKey: number }) {
  if (index === 0) return <CostVisual animKey={animKey} />;
  if (index === 1) return <CloudNodesVisual animKey={animKey} />;
  if (index === 2) return <ServerlessVisual animKey={animKey} />;
  if (index === 3) return <MonitorVisual animKey={animKey} />;
  return <PipelineVisual animKey={animKey} />;
}

// ─── Panel variants ───────────────────────────────────────────────────────────

const panelVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.52, ease: easeOutExpo },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
    transition: { duration: 0.28, ease },
  }),
};

// ─── Products ─────────────────────────────────────────────────────────────────

export default function Products() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  function goTo(index: number) {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }

  const product = PRODUCTS[active];

  return (
    <section
      id="products"
      className="relative py-28 sm:py-36"
      style={{
        background:
          "radial-gradient(ellipse 120% 70% at 80% 10%, #0c0a20 0%, #070913 45%, #050810 100%)",
      }}
    >
      {/* Top edge fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060813] to-transparent" />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[700px] -translate-y-1/4 translate-x-1/4 rounded-full opacity-[0.15] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(59,130,246,0.35) 55%, transparent 100%)",
        }}
      />

      {/* Bottom edge fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060711] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ── Section header ── */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-violet-400"
                style={{ boxShadow: "0 0 6px rgba(167,139,250,0.9)" }}
              />
              What We Build
            </div>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
        </motion.div>

        {/* ── Product selector tabs ── */}
        <motion.div
          className="mb-10 flex gap-2 overflow-x-auto pb-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
        >
          {PRODUCTS.map((p, i) => {
            const isActive = active === i;
            return (
              <button
                key={p.number}
                onClick={() => goTo(i)}
                className="group relative flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-left transition-colors duration-200"
                style={{
                  borderColor: isActive ? p.borderGlow : "rgba(255,255,255,0.07)",
                  background: isActive ? `${p.glowColor}` : "transparent",
                }}
              >
                <span
                  className="font-mono text-[9px] tabular-nums transition-colors duration-200"
                  style={{ color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.22)" }}
                >
                  {p.number}
                </span>
                <span
                  className="hidden text-xs font-medium transition-colors duration-200 sm:block"
                  style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.32)" }}
                >
                  {p.name.split(" ").slice(0, 2).join(" ")}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: `0 0 0 1px ${p.borderGlow}`,
                    }}
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ── Main panel ── */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* Panel background shell */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 5% 0%, ${product.glowColor} 0%, transparent 55%), rgba(7,9,22,0.96)`,
              border: `1px solid ${product.borderGlow.replace("0.48)", "0.12)")}`,
              transition: "background 0.4s ease, border-color 0.4s ease",
            }}
          />

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative grid grid-cols-1 gap-0 lg:grid-cols-[1fr_380px]"
            >
              {/* Left: content */}
              <div className="px-10 py-12 md:px-14 md:py-14">
                {/* Icon */}
                <div
                  className={`mb-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br p-4 ${product.iconBg}`}
                >
                  <product.icon
                    className={`h-6 w-6 ${product.iconClass}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Name + tagline */}
                <h3 className="mb-3 text-[clamp(1.4rem,2.3vw,2rem)] font-bold leading-tight tracking-tight text-white/92">
                  {product.name}
                </h3>
                <p className="mb-8 text-sm font-medium italic text-white/35">
                  "{product.tagline}"
                </p>

                {/* Features */}
                <div className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-[1px] h-3.5 w-3.5 flex-shrink-0 text-white/22"
                        strokeWidth={2}
                      />
                      <span className="text-sm leading-snug text-white/55">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Use cases */}
                <div className="mb-8 space-y-2">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-white/22">
                    Proven outcomes
                  </p>
                  {product.useCases.map((uc) => (
                    <div
                      key={uc.industry}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.03] px-4 py-3"
                    >
                      <span
                        className="mt-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                        style={{
                          background: product.glowColor,
                          color: product.borderGlow,
                        }}
                      >
                        {uc.industry}
                      </span>
                      <span className="text-sm text-white/55">{uc.result}</span>
                    </div>
                  ))}
                </div>

                {/* Ideal for chips */}
                <div className="mb-10 flex flex-wrap gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/22 self-center mr-1">
                    Ideal for:
                  </span>
                  {product.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/42"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${product.borderGlow.replace("0.48)", "0.7)")} 0%, ${product.borderGlow.replace("0.48)", "0.35)")} 100%)`,
                    boxShadow: `0 2px 20px ${product.glowColor}`,
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 4px 32px ${product.borderGlow.replace("0.48)", "0.4)")}`,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22, ease }}
                >
                  {product.cta}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </motion.button>
              </div>

              {/* Right: visual panel */}
              <div
                className="relative hidden min-h-[420px] overflow-hidden border-l lg:block"
                style={{ borderColor: product.borderGlow.replace("0.48)", "0.09)") }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${product.glowColor} 0%, transparent 70%)`,
                  }}
                />
                <ProductVisual index={active} animKey={active} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 inset-x-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 5%, ${product.borderGlow}, transparent 95%)`,
              transition: "background 0.4s ease",
            }}
          />
        </div>

        {/* ── Navigation arrows ── */}
        <div className="mt-6 flex items-center justify-between">
          {/* Progress dots */}
          <div className="flex gap-2">
            {PRODUCTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: active === i ? 24 : 6,
                  background:
                    active === i
                      ? product.borderGlow
                      : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-3">
            {[
              { Icon: ChevronLeft, onClick: () => goTo(Math.max(0, active - 1)), disabled: active === 0 },
              {
                Icon: ChevronRight,
                onClick: () => goTo(Math.min(PRODUCTS.length - 1, active + 1)),
                disabled: active === PRODUCTS.length - 1,
              },
            ].map(({ Icon, onClick, disabled }, i) => (
              <motion.button
                key={i}
                onClick={onClick}
                disabled={disabled}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm disabled:opacity-25"
                whileHover={disabled ? {} : { scale: 1.08, borderColor: "rgba(255,255,255,0.22)" }}
                whileTap={disabled ? {} : { scale: 0.94 }}
                transition={{ duration: 0.2, ease }}
              >
                <Icon className="h-4 w-4 text-white/60" strokeWidth={2} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
