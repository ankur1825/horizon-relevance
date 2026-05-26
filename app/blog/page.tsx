"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const SHEET_URL =
  "https://opensheet.elk.sh/1eLxFungKXOd0BHVWpyXSzBzKqrvXfeaWPmiOvWkEDw4/Sheet1";

type Post = {
  title: string;
  description: string;
  link: string;
  date: string;
};

// ─── Featured card (first post, spans full width) ─────────────────────────────

function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.a
      href={post.link || "#"}
      target={post.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group relative col-span-1 overflow-hidden rounded-2xl sm:col-span-2"
      style={{
        background: "rgba(7,3,20,0.97)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.65, ease: easeOutExpo }}
    >
      {/* B: violet bloom from top-left on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 75% at 0% 0%, rgba(139,92,246,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="relative px-8 py-9 sm:px-10 sm:py-10">
        {/* A: monospace date chip */}
        {post.date && (
          <span className="mb-5 block font-mono text-[10px] font-medium uppercase tracking-widest text-white/28">
            {post.date}
          </span>
        )}

        {/* A: left accent bar + title */}
        <div className="border-l-2 pl-6" style={{ borderColor: "rgba(139,92,246,0.45)" }}>
          <h2 className="mb-4 text-[22px] font-bold leading-snug tracking-tight text-white/85 transition-colors duration-200 group-hover:text-white sm:text-[24px]">
            <span className="underline-offset-4 decoration-violet-400/35 group-hover:underline">
              {post.title}
            </span>
          </h2>
          {post.description && (
            <p className="max-w-2xl text-[14px] leading-relaxed text-white/52">
              {post.description}
            </p>
          )}
        </div>

        {/* B: arrow fades in on hover */}
        <div className="mt-7 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-[12px] font-medium text-violet-400">Read more</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-violet-400" />
        </div>
      </div>
    </motion.a>
  );
}

// ─── Regular card ─────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.a
      href={post.link || "#"}
      target={post.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: "rgba(7,3,20,0.97)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.07, ease: easeOutExpo }}
    >
      {/* B: violet bloom from top-left on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 0% 0%, rgba(139,92,246,0.13) 0%, transparent 65%)",
        }}
      />

      <div className="relative flex flex-1 flex-col px-6 py-7">
        {/* A: monospace date chip */}
        {post.date && (
          <span className="mb-4 block font-mono text-[10px] font-medium uppercase tracking-widest text-white/25">
            {post.date}
          </span>
        )}

        {/* A: left accent bar + title */}
        <div className="flex-1 border-l-2 pl-5" style={{ borderColor: "rgba(139,92,246,0.35)" }}>
          <h2 className="mb-3 text-[17px] font-bold leading-snug tracking-tight text-white/82 transition-colors duration-200 group-hover:text-white">
            <span className="underline-offset-4 decoration-violet-400/35 group-hover:underline">
              {post.title}
            </span>
          </h2>
          {post.description && (
            <p className="text-[13px] leading-relaxed text-white/45 line-clamp-4">
              {post.description}
            </p>
          )}
        </div>

        {/* B: arrow fades in on hover */}
        <div className="mt-6 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-[11px] font-medium text-violet-400">Read more</span>
          <ArrowUpRight className="h-3 w-3 text-violet-400" />
        </div>
      </div>
    </motion.a>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function FeaturedSkeleton() {
  return (
    <div
      className="col-span-1 overflow-hidden rounded-2xl px-8 py-9 sm:col-span-2 sm:px-10 sm:py-10"
      style={{ background: "rgba(7,3,20,0.97)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mb-5 h-2.5 w-24 animate-pulse rounded-full bg-white/[0.06]" />
      <div className="border-l-2 pl-6" style={{ borderColor: "rgba(139,92,246,0.2)" }}>
        <div className="mb-2 h-6 w-[70%] animate-pulse rounded-full bg-white/[0.09]" />
        <div className="mb-6 h-6 w-[48%] animate-pulse rounded-full bg-white/[0.06]" />
        <div className="mb-1.5 h-3.5 w-full animate-pulse rounded-full bg-white/[0.05]" />
        <div className="mb-1.5 h-3.5 w-[88%] animate-pulse rounded-full bg-white/[0.04]" />
        <div className="h-3.5 w-[70%] animate-pulse rounded-full bg-white/[0.04]" />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl px-6 py-7"
      style={{ background: "rgba(7,3,20,0.97)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="mb-4 h-2.5 w-20 animate-pulse rounded-full bg-white/[0.06]" />
      <div className="border-l-2 pl-5" style={{ borderColor: "rgba(139,92,246,0.18)" }}>
        <div className="mb-2 h-5 w-[82%] animate-pulse rounded-full bg-white/[0.08]" />
        <div className="mb-5 h-5 w-[58%] animate-pulse rounded-full bg-white/[0.06]" />
        <div className="mb-1.5 h-3 w-full animate-pulse rounded-full bg-white/[0.05]" />
        <div className="mb-1.5 h-3 w-[90%] animate-pulse rounded-full bg-white/[0.04]" />
        <div className="mb-1.5 h-3 w-[78%] animate-pulse rounded-full bg-white/[0.04]" />
        <div className="h-3 w-[60%] animate-pulse rounded-full bg-white/[0.04]" />
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 py-28 text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOutExpo }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl border"
        style={{
          borderColor: "rgba(167,139,250,0.2)",
          background: "rgba(139,92,246,0.07)",
        }}
      >
        <span className="text-2xl">✍️</span>
      </div>
      <div>
        <p className="text-[14px] font-medium text-white/40">No posts yet.</p>
        <p className="mt-1 text-[12px] text-white/22">Check back soon.</p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((r) => r.json())
      .then((data: Record<string, string>[]) =>
        setPosts(
          data
            .map((row) => ({
              title:       row.TITLE       ?? row.title       ?? "",
              description: row.DESCRIPTION ?? row.description ?? "",
              link:        row.LINK        ?? row.link        ?? "",
              date:        row.DATE        ?? row.date        ?? "",
            }))
            .filter((p) => p.title.trim())
        )
      )
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 150% 70% at 60% 0%, #130a24 0%, #080518 48%, #040310 100%)",
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

      {/* Violet bloom — top right */}
      <motion.div
        className="pointer-events-none fixed z-[0]"
        style={{
          right: "-8%", top: "-5%",
          width: "60vw", height: "65vh",
          background:
            "radial-gradient(ellipse 52% 55% at 56% 38%, rgba(139,92,246,0.16) 0%, transparent 68%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, -22, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Indigo bloom — bottom left */}
      <motion.div
        className="pointer-events-none fixed z-[0]"
        style={{
          left: "-6%", bottom: "8%",
          width: "44vw", height: "52vh",
          background:
            "radial-gradient(ellipse 50% 48% at 44% 46%, rgba(99,102,241,0.12) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, 18, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-6 pb-28 pt-28">

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
              <span
                className="h-1.5 w-1.5 rounded-full bg-violet-400"
                style={{ boxShadow: "0 0 6px rgba(167,139,250,0.9)" }}
              />
              Insights
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From the{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Team
            </motion.span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/30">
            Thinking, lessons, and perspectives on cloud, AI, and
            modern engineering from the people building it.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FeaturedSkeleton />
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {posts.map((post, i) =>
              i === 0 ? (
                <FeaturedCard key={`${post.title}-0`} post={post} />
              ) : (
                <PostCard key={`${post.title}-${i}`} post={post} index={i} />
              )
            )}
          </div>
        )}

      </div>
    </main>
  );
}
