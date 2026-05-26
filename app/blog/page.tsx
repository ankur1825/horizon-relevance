"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, LinkedinIcon } from "lucide-react";
import type { BlogPost } from "@/app/api/linkedin-posts/route";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl p-px"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: easeOutExpo }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
      {/* Border — brightens on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-400 opacity-30 group-hover:opacity-75"
        style={{
          background:
            "linear-gradient(135deg, rgba(56,189,248,0.55) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
        }}
      />

      {/* Card body */}
      <div
        className="relative flex flex-1 flex-col rounded-[calc(1rem-1px)] px-7 py-6"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 8% 0%, rgba(56,189,248,0.07) 0%, transparent 55%), rgba(6,3,18,0.97)",
        }}
      >
        {/* Top meta row */}
        <div className="mb-5 flex items-center justify-between">
          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest"
            style={{
              background: "rgba(10,102,194,0.12)",
              border: "1px solid rgba(10,102,194,0.28)",
              color: "#60a5fa",
            }}
          >
            <LinkedinIconclassName="h-3 w-3" />
            LinkedIn
          </div>
          {post.date && (
            <span className="text-[11px] text-white/28">{post.date}</span>
          )}
        </div>

        {/* Title */}
        <h2 className="mb-3 text-[15px] font-semibold leading-snug tracking-tight text-white/88 transition-colors duration-200 group-hover:text-white">
          {post.title}
        </h2>

        {/* Description */}
        {post.description && (
          <p className="mb-6 flex-1 text-[13px] leading-relaxed text-white/42 line-clamp-4">
            {post.description}
          </p>
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between border-t pt-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="text-[11px] text-white/25">Read full post</span>
          <span
            className="flex items-center gap-1 text-[11px] font-medium text-sky-400/60 transition-colors duration-200 group-hover:text-sky-400"
          >
            View on LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl px-7 py-6"
      style={{ background: "rgba(6,3,18,0.97)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="h-5 w-20 animate-pulse rounded-full bg-white/[0.07]" />
        <div className="h-3.5 w-16 animate-pulse rounded-full bg-white/[0.05]" />
      </div>
      <div className="mb-2 h-4 w-[88%] animate-pulse rounded-full bg-white/[0.07]" />
      <div className="mb-5 h-4 w-[70%] animate-pulse rounded-full bg-white/[0.05]" />
      <div className="mb-1.5 h-3 w-full animate-pulse rounded-full bg-white/[0.04]" />
      <div className="mb-1.5 h-3 w-[92%] animate-pulse rounded-full bg-white/[0.04]" />
      <div className="mb-1.5 h-3 w-[78%] animate-pulse rounded-full bg-white/[0.04]" />
      <div className="mb-6 h-3 w-[60%] animate-pulse rounded-full bg-white/[0.04]" />
      <div className="h-px w-full bg-white/[0.04]" />
      <div className="mt-4 flex justify-between">
        <div className="h-3 w-16 animate-pulse rounded-full bg-white/[0.04]" />
        <div className="h-3 w-24 animate-pulse rounded-full bg-white/[0.05]" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/linkedin-posts")
      .then((r) => r.json())
      .then(({ posts }) => setPosts(posts ?? []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 160% 75% at 75% 0%, #031422 0%, #060b1a 48%, #040810 100%)",
      }}
    >
      {/* Grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[0]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
          opacity: 0.055,
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "-5% -8%", "6% 4%", "0% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Sky bloom */}
      <motion.div
        className="pointer-events-none fixed z-[0]"
        style={{
          right: "-6%", top: "0%",
          width: "55vw", height: "60vh",
          background:
            "radial-gradient(ellipse 52% 55% at 54% 40%, rgba(56,189,248,0.1) 0%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, -20, 0], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet bloom */}
      <motion.div
        className="pointer-events-none fixed z-[0]"
        style={{
          left: "-5%", bottom: "10%",
          width: "40vw", height: "50vh",
          background:
            "radial-gradient(ellipse 50% 48% at 44% 46%, rgba(139,92,246,0.1) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, 16, 0], opacity: [0.4, 0.68, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      <div className="relative z-[1] mx-auto max-w-5xl px-6 pb-28 pt-28">

        {/* Back */}
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
          className="mb-14 mt-10"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.06, ease: easeOutExpo }}
        >
          <div className="mb-5 flex">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/45 backdrop-blur-sm">
              <LinkedinIconclassName="h-3 w-3 text-sky-400" />
              Powered by LinkedIn
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Insights &{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Updates
            </motion.span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/30">
            Our LinkedIn posts, automatically surfaced here. Cloud, AI, and
            DevSecOps thinking from the team.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error || posts.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <LinkedinIconclassName="h-8 w-8 text-white/20" />
            <p className="text-sm text-white/30">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* Follow CTA */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <p className="text-[12px] text-white/25">Want the full feed?</p>
          <a
            href="https://www.linkedin.com/company/horizonrelevance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(10,102,194,0.45)",
              background: "rgba(10,102,194,0.1)",
              color: "#60a5fa",
            }}
          >
            <LinkedinIconclassName="h-4 w-4" />
            Follow on LinkedIn
          </a>
        </motion.div>

      </div>
    </main>
  );
}
