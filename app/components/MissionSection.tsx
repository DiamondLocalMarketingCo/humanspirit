"use client";

import { motion } from "framer-motion";

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="relative min-h-[100svh] overflow-hidden bg-[#0a0e18] px-6 py-20 sm:px-8 lg:px-16"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(94,214,255,0.08),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-black/60" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <motion.div
          className="pointer-events-none absolute left-1/2 -bottom-20 h-96 w-96 -translate-x-1/2 rounded-full border border-cyan-300/10 blur-2xl opacity-30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cline x1=%220%22 y1=%220%22 x2=%22200%22 y2=%220%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3Cline x1=%220%22 y1=%2240%22 x2=%22200%22 y2=%2240%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3Cline x1=%220%22 y1=%2280%22 x2=%22200%22 y2=%2280%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3Cline x1=%220%22 y1=%22120%22 x2=%22200%22 y2=%22120%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3Cline x1=%220%22 y1=%22160%22 x2=%22200%22 y2=%22160%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3Cline x1=%220%22 y1=%22200%22 x2=%22200%22 y2=%22200%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E')",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center justify-center min-h-[100svh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="text-[0.95rem] uppercase tracking-[0.65em] text-cyan-300/70"
          >
            Mission
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="max-w-[800px] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[clamp(2.4rem,4.5vw,4.4rem)]"
          >
            Develop and build intelligent systems that understand, adapt, and act
            in the physical world.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
