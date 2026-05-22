"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// ─── Easing — matches design system ───────────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "intro",      number: "01", label: "Home"       },
  { id: "platform",   number: "02", label: "Platform"   },
  { id: "products",   number: "03", label: "Products"   },
  { id: "industries", number: "04", label: "Industries" },
  { id: "company",    number: "05", label: "Company"    },
  { id: "contact",    number: "06", label: "Contact"    },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

// ─── SectionIndex ─────────────────────────────────────────────────────────────

export default function SectionIndex() {
  const [activeId, setActiveId] = useState<SectionId>("intro");
  const [hoveredId, setHoveredId] = useState<SectionId | null>(null);

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Use the first intersecting entry (topmost in viewport)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);

  return (
    // Hidden on all viewports below lg
    <aside className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 xl:flex">
      <div className="relative flex select-none flex-col">

        {/* ── Vertical rail ── */}
        <div className="absolute left-[7px] top-3 h-[calc(100%-24px)] w-px overflow-hidden">
          {/* Static dim rail */}
          <div className="h-full w-full bg-white/[0.09]" />
          {/* Animated highlight segment that slides to active position */}
          <motion.div
            className="absolute left-0 w-full rounded-full bg-gradient-to-b from-violet-400/70 via-violet-300/50 to-transparent"
            style={{ height: 32 }}
            animate={{ top: `${activeIndex * 52 + 10}px` }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          />
        </div>

        {/* ── Section items ── */}
        {SECTIONS.map(({ id, number, label }) => {
          const isActive = activeId === id;
          const isHovered = hoveredId === id;

          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHoveredId(id as SectionId)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={`Go to ${label}`}
              className="group relative flex h-[52px] items-center gap-4 text-left focus:outline-none"
            >
              {/* ── Dot ── */}
              <div className="relative z-10 flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center">
                {/* Pulse ring — active only */}
                <motion.div
                  className="absolute rounded-full border border-violet-400/30"
                  animate={
                    isActive
                      ? { scale: [1, 2.6], opacity: [0.55, 0] }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={
                    isActive
                      ? { duration: 2, repeat: Infinity, ease: "easeOut", repeatDelay: 0.6 }
                      : { duration: 0.2 }
                  }
                  style={{ width: 8, height: 8 }}
                />

                {/* Core dot */}
                <motion.div
                  className="rounded-full"
                  animate={
                    isActive
                      ? {
                          width: 7,
                          height: 7,
                          backgroundColor: "rgb(167,139,250)",
                          boxShadow:
                            "0 0 10px rgba(167,139,250,0.85), 0 0 22px rgba(167,139,250,0.35)",
                        }
                      : isHovered
                        ? {
                            width: 5,
                            height: 5,
                            backgroundColor: "rgba(255,255,255,0.4)",
                            boxShadow: "none",
                          }
                        : {
                            width: 4,
                            height: 4,
                            backgroundColor: "rgba(255,255,255,0.16)",
                            boxShadow: "none",
                          }
                  }
                  transition={{ duration: 0.32, ease }}
                />
              </div>

              {/* ── Text ── */}
              <div className="flex items-baseline gap-2">
                {/* Number */}
                <motion.span
                  className="font-mono text-[9px] tabular-nums leading-none tracking-widest"
                  animate={{
                    color: isActive
                      ? "rgba(255,255,255,0.9)"
                      : isHovered
                        ? "rgba(255,255,255,0.42)"
                        : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.28, ease }}
                >
                  {number}
                </motion.span>

                {/* Label */}
                <motion.span
                  className="text-[10px] font-medium leading-none tracking-[0.16em]"
                  style={{ textTransform: "uppercase" }}
                  animate={{
                    color: isActive
                      ? "rgba(255,255,255,0.65)"
                      : isHovered
                        ? "rgba(255,255,255,0.32)"
                        : "rgba(255,255,255,0.14)",
                    x: isActive ? 3 : 0,
                  }}
                  transition={{ duration: 0.32, ease }}
                >
                  {label}
                </motion.span>
              </div>

              {/* ── Hover cursor line (left of dot, reinforces clickability) ── */}
              <motion.div
                className="absolute left-[-6px] top-1/2 h-px -translate-y-1/2 bg-white/30"
                animate={{ width: isHovered && !isActive ? 5 : 0, opacity: isHovered && !isActive ? 1 : 0 }}
                transition={{ duration: 0.2, ease }}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
