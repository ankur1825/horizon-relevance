"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function alpha(color: string, a: number) {
  return color.replace(/[\d.]+\)$/, `${a})`);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Member = {
  id: string;
  name: string;
  initials: string;
  title: string;
  department: string;
  bio: string;
  photo?: string;
  color: string;
};

const MEMBERS: Member[] = [
  {
    id: "ankur-kashyap",
    name: "Ankur Kashyap",
    initials: "AK",
    title: "Founder & Chief Executive Officer",
    department: "Leadership",
    bio: "Ankur Kashyap is the Founder & CEO of Horizon Relevance LLC, specializing in Platform Engineering, Cloud Transformation, DevSecOps, and Enterprise Automation. He helps organizations modernize technology operations through scalable platforms, intelligent automation, and standardized engineering practices.",
    photo: "/team/ankur-kashyap.jpg",
    color: "rgba(6,182,212,0.9)",
  },
  {
    id: "rishi-sharma",
    name: "Rishi Sharma",
    initials: "RS",
    title: "Technical Program Manager",
    department: "Program Management",
    bio: "Rishi Sharma is a Technical Product Manager with expertise in Cloud Engineering, DevOps, and DevSecOps, specializing in scalable cloud-native solutions, CI/CD automation, and secure product delivery. He brings experience in AWS infrastructure, platform automation, and cross-functional product strategy across enterprise and healthcare environments.",
    photo: "/team/rishi-sharma.jpg",
    color: "rgba(167,139,250,0.9)",
  },
];

// ─── Member Card ──────────────────────────────────────────────────────────────

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl p-px"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.72, delay: index * 0.14, ease: easeOutExpo }}
    >
      {/* Gradient border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(145deg, ${alpha(member.color, 0.48)} 0%, rgba(255,255,255,0.05) 48%, transparent 100%)`,
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-[calc(1.5rem-1px)] px-8 py-10"
        style={{
          background: `radial-gradient(ellipse 90% 50% at 50% 0%, ${alpha(member.color, 0.13)} 0%, transparent 58%), rgba(8,3,22,0.97)`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Photo / initials avatar */}
        <div className="mb-6 flex justify-center">
          <div
            className="relative h-28 w-28 overflow-hidden rounded-full border-2"
            style={{
              borderColor: alpha(member.color, 0.45),
              boxShadow: `0 0 28px ${alpha(member.color, 0.28)}, 0 0 64px ${alpha(member.color, 0.1)}`,
            }}
          >
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-2xl font-bold"
                style={{
                  background: alpha(member.color, 0.12),
                  color: member.color,
                }}
              >
                {member.initials}
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="mb-1 text-center text-xl font-bold text-white/92">
          {member.name}
        </h3>

        {/* Title */}
        <p
          className="mb-4 text-center text-sm font-semibold"
          style={{ color: member.color }}
        >
          {member.title}
        </p>

        {/* Department badge */}
        <div className="mb-6 flex justify-center">
          <div
            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-widest"
            style={{
              background: alpha(member.color, 0.08),
              border: `1px solid ${alpha(member.color, 0.22)}`,
              color: alpha(member.color, 0.72),
            }}
          >
            {member.department}
          </div>
        </div>

        {/* Bio */}
        <p className="text-[13px] leading-relaxed text-white/40">
          {member.bio}
        </p>

        {/* Bottom accent */}
        <div
          className="pointer-events-none absolute bottom-0 left-8 right-8 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${alpha(member.color, 0.35)}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 160% 80% at 18% 0%, #031c24 0%, #060b1a 48%, #040810 100%)",
      }}
    >
      {/* Grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[0]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.06,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-5% -8%", "6% 4%", "0% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Cyan bloom */}
      <motion.div
        className="pointer-events-none fixed z-[0]"
        style={{
          left: "-8%",
          top: "5%",
          width: "55vw",
          height: "65vh",
          background: "radial-gradient(ellipse 50% 55% at 44% 40%, rgba(6,182,212,0.14) 0%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, 24, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet bloom */}
      <motion.div
        className="pointer-events-none fixed z-[0]"
        style={{
          right: "-6%",
          bottom: "10%",
          width: "44vw",
          height: "52vh",
          background: "radial-gradient(ellipse 52% 48% at 52% 46%, rgba(139,92,246,0.12) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, -18, 0], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      <div className="relative z-[1] mx-auto max-w-5xl px-6 pb-28 pt-28">

        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] text-white/38 transition-colors duration-200 hover:text-white/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-16 mt-10"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.06, ease: easeOutExpo }}
        >
          <div className="mb-5 flex">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 6px rgba(6,182,212,0.9)" }}
              />
              The People
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built by a team that{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              ships.
            </motion.span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/30">
            Engineers, architects, and operators who&apos;ve built and run cloud-scale
            systems. No bloat — just people who get things done.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {MEMBERS.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-5 border-t border-white/[0.06] pt-16 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeOutExpo }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{
              borderColor: "rgba(6,182,212,0.25)",
              background: "rgba(6,182,212,0.08)",
              boxShadow: "0 0 20px rgba(6,182,212,0.1)",
            }}
          >
            <span className="text-xl">🚀</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white/88">
              We&apos;re still growing.
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/36">
              If you want to build something that actually matters, check out our
              open roles.
            </p>
          </div>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              borderColor: "rgba(6,182,212,0.35)",
              background: "rgba(6,182,212,0.08)",
              color: "rgba(6,182,212,0.9)",
            }}
          >
            View Open Roles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
