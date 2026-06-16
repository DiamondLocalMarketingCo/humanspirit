"use client";

import { motion } from "framer-motion";

export default function IntroLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020407]"
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{ opacity: 1, pointerEvents: "auto" }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <div className="flex w-full max-w-[520px] flex-col items-center gap-6 px-6 sm:max-w-[560px]">
        <div className="w-[140px] sm:w-[180px] md:w-[220px]">
          <img
            src="/liorvel_logo_white_transparent_true_alpha.png"
            alt="Human Spirit"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/8">
          <div className="absolute inset-y-0 left-0 w-full rounded-full bg-white/8" />
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-white/80 shadow-[0_0_30px_rgba(94,214,255,0.35)]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-14 rounded-full bg-white/20 blur-sm"
            initial={{ x: -84 }}
            animate={{ x: [ -84, 520 ] }}
            transition={{ duration: 2.0, ease: "linear", repeat: Infinity, repeatDelay: 0.4 }}
          />

          <div className="absolute inset-y-0 left-0 right-0 grid grid-cols-12 gap-2 px-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="block h-px w-full rounded-full bg-white/12" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
