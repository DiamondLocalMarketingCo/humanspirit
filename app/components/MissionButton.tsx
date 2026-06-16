"use client";

import { motion } from "framer-motion";

interface MissionButtonProps {
  showMission: boolean;
  onToggle: () => void;
}

export default function MissionButton({ showMission, onToggle }: MissionButtonProps) {
  return (
    <>
      {/* Desktop button - bottom-right pill */}
      <motion.button
        onClick={onToggle}
        className="hidden sm:flex absolute bottom-8 right-8 lg:bottom-12 lg:right-12 items-center gap-3 px-5 py-2.5 rounded-full border border-white/30 bg-white/5 transition-all duration-300 text-xs uppercase tracking-[0.35em] text-white/80"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
        whileHover={{
          boxShadow: "0 0 24px rgba(94, 214, 255, 0.25)",
          borderColor: "rgba(94, 214, 255, 0.6)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "rgba(255, 255, 255, 1)",
        }}
      >
        {showMission ? (
          <>
            <motion.span
              key="back-arrow"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              ←
            </motion.span>
            <span>Back</span>
          </>
        ) : (
          <>
            <span>Mission</span>
            <motion.span
              key="mission-arrow"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </>
        )}
      </motion.button>

      {/* Mobile button - circular arrow button at bottom-center */}
      <motion.button
        onClick={onToggle}
        className="sm:hidden absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-white/30 bg-white/5 flex items-center justify-center transition-all duration-300 text-white/80 hover:text-white"
        style={{ bottom: "clamp(1.5rem, 1rem + env(safe-area-inset-bottom, 0), 2.5rem)" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
        whileHover={{
          boxShadow: "0 0 20px rgba(94, 214, 255, 0.25)",
          borderColor: "rgba(94, 214, 255, 0.6)",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          color: "rgba(255, 255, 255, 1)",
        }}
      >
        <motion.span
          className="text-xl"
          key={showMission ? "back" : "mission"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {showMission ? "←" : "→"}
        </motion.span>
      </motion.button>
    </>
  );
}

