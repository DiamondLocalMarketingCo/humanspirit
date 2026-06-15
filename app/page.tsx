"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import GlobeClient from "./components/GlobeClient";
import IntroLoader from "./components/IntroLoader";

const pageMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

const headlineMotion = {
  hidden: { opacity: 0, y: 24, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: "easeOut", delay: 0.18 },
  },
};

const footerMotion = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut", delay: 0.5 },
  },
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#020407] text-white">
      <AnimatePresence>{loading && <IntroLoader />}</AnimatePresence>

      <motion.div
        initial="hidden"
        animate={loading ? "hidden" : "visible"}
        variants={pageMotion}
        className="relative min-h-[100svh]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 blur-3xl opacity-40" />
            <div className="absolute left-[42%] top-[12%] h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl opacity-40" />
          </motion.div>

          <div className="absolute left-1/2 top-1/2 h-[110svh] w-[110svw] max-h-[1400px] max-w-[1400px] -translate-x-1/2 -translate-y-1/2">
            <GlobeClient />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(94,214,255,0.16),transparent_12%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.05),transparent_55%)] mix-blend-screen opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-black/44" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.04),transparent_22%)] blur-3xl opacity-20" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),transparent_45%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Cfilter id=%22noise%22 x=%220%25%22 y=%220%25%22 width=%22100%25%22 height=%22100%25%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.82%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23noise)%22 fill=%22rgba(255,255,255,0.16)%22/%3E%3C/svg%3E')",
              backgroundSize: "240px 240px",
            }}
          />
        </div>

        <section className="relative z-10 h-[100svh] px-6 pt-10 pb-6 sm:px-8 sm:pt-12 lg:px-16">
          <div className="absolute left-1/2 top-1/2 w-full max-w-[920px] -translate-x-1/2 -translate-y-1/2 px-4 text-center">
            <motion.h1
              variants={headlineMotion}
              className="mx-auto max-w-[900px] text-[clamp(2.4rem,7vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[clamp(2.9rem,5vw,5.6rem)]"
            >
              The human spirit will lead us to places we never thought possible.
            </motion.h1>
          </div>

          <div className="absolute left-1/2 bottom-6 w-full max-w-[700px] -translate-x-1/2 px-4 text-center sm:bottom-8">
            <motion.p
              variants={footerMotion}
              className="mx-auto max-w-[700px] text-[clamp(1.6rem,4.5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[clamp(1.9rem,4vw,3.4rem)]"
            >
              Building the future.
            </motion.p>
            <motion.span
              variants={footerMotion}
              className="mt-3 inline-block text-[0.85rem] uppercase tracking-[0.55em] text-white/50 sm:text-[0.95rem]"
            >
              Human Spirit
            </motion.span>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
