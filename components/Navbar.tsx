"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Company", href: "#company" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Easing ───────────────────────────────────────────────────────────────────

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// ─── NavLink ──────────────────────────────────────────────────────────────────

function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative py-0.5 text-sm font-medium text-white/55 transition-colors duration-300 hover:text-white/90"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r from-white/75 via-white/45 to-transparent"
        style={{ originX: 0 }}
        animate={{
          scaleX: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease }}
      />
    </Link>
  );
}

// ─── HamburgerButton ──────────────────────────────────────────────────────────

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-md focus:outline-none md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.span
        className="block h-px w-5 rounded-full bg-white/75"
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.32, ease }}
      />
      <motion.span
        className="block h-px w-5 rounded-full bg-white/75"
        animate={
          isOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.22, ease }}
      />
      <motion.span
        className="block h-px w-5 rounded-full bg-white/75"
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.32, ease }}
      />
    </button>
  );
}

// ─── CTAButton ────────────────────────────────────────────────────────────────

function CTAButton({ onClick }: { onClick?: () => void }) {
  return (
    <motion.a
      href="#demo"
      onClick={onClick}
      className="relative inline-flex cursor-pointer select-none items-center overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      variants={{
        rest: {
          scale: 1,
          boxShadow: "0 2px 12px rgba(99, 102, 241, 0.25)",
        },
        hover: {
          scale: 1.03,
          boxShadow:
            "0 0 28px rgba(139, 92, 246, 0.55), 0 0 60px rgba(99, 102, 241, 0.2), 0 4px 16px rgba(0,0,0,0.25)",
        },
      }}
      transition={{ duration: 0.25, ease }}
    >
      {/* Shimmer sweep */}
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent"
        variants={{
          rest: { x: "-120%" },
          hover: { x: "140%" },
        }}
        transition={{ duration: 0.55, ease }}
      />
      <span className="relative z-10">Book a Demo</span>
    </motion.a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.82]);
  const blurAmount = useTransform(scrollY, [0, 80], [0, 14]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0.07, 0.16]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.45]);
  const navHeight = useTransform(scrollY, [0, 80], [56, 46]);

  const background = useMotionTemplate`rgba(8, 8, 14, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurAmount}px)`;
  const boxShadow = useMotionTemplate`0 8px 40px rgba(0, 0, 0, ${shadowOpacity}), inset 0 0 0 1px rgba(255, 255, 255, ${borderOpacity})`;

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.div
        className="w-full max-w-5xl"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.12 }}
      >
        {/* Pill / card */}
        <motion.nav
          className="overflow-hidden"
          style={{
            background,
            backdropFilter,
            WebkitBackdropFilter: backdropFilter,
            boxShadow,
          }}
          animate={{ borderRadius: mobileOpen ? 20 : 9999 }}
          transition={{ duration: 0.38, ease }}
        >
          {/* Header row */}
          <motion.div
            className="flex items-center justify-between px-4 sm:px-6"
            style={{ height: navHeight }}
          >
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <motion.span
                className="text-[15px] font-bold tracking-tight text-white"
                whileHover={{ opacity: 0.82 }}
                transition={{ duration: 0.2 }}
              >
                Horizon
                <span className="text-violet-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.55)]">
                  Relevance
                </span>
              </motion.span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden items-center gap-7 md:flex">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} label={link.label} href={link.href} />
              ))}
            </nav>

            {/* Desktop CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <CTAButton />
              </div>
              <HamburgerButton
                isOpen={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              />
            </div>
          </motion.div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease }}
                className="overflow-hidden md:hidden"
              >
                <div className="border-t border-white/[0.07] px-4 pb-5 pt-3">
                  <div className="flex flex-col gap-0.5">
                    {NAV_LINKS.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.055,
                          duration: 0.32,
                          ease: easeOutExpo,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-1 py-2.5 text-sm font-medium text-white/55 transition-colors duration-200 hover:text-white/90"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: NAV_LINKS.length * 0.055,
                        duration: 0.35,
                        ease: easeOutExpo,
                      }}
                      className="pt-3"
                    >
                      <CTAButton onClick={() => setMobileOpen(false)} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.div>
    </div>
  );
}
