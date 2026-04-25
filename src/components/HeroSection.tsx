"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.15]);
  const vignetteOp = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);

  // Staggered text reveals — text invisible at scroll 0, reveals on first pixel scroll.
  const labelOp = useTransform(scrollYProgress, [0, 0.005], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0, 0.005], [10, 0]);
  const h1Op = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
  const h1Y = useTransform(scrollYProgress, [0, 0.01], [20, 0]);
  const h2Op = useTransform(scrollYProgress, [0.005, 0.02], [0, 1]);
  const h2Y = useTransform(scrollYProgress, [0.005, 0.02], [20, 0]);
  const subOp = useTransform(scrollYProgress, [0.01, 0.04], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.01, 0.04], [20, 0]);
  const btnOp = useTransform(scrollYProgress, [0.02, 0.05], [0, 1]);
  const btnY = useTransform(scrollYProgress, [0.02, 0.05], [15, 0]);

  return (
    <div ref={ref} className="relative bg-[#1A1A1A]" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/hero.png"
            alt="Surveyor with Leica DGPS — Shahi Group"
            fill
            className="object-cover object-center"
            priority
            quality={95}
            sizes="100vw"
          />
        </motion.div>

        {/* Vignette */}
        <motion.div
          style={{ opacity: vignetteOp }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.85) 100%)",
          }} />
        </motion.div>

        {/* Text */}
        <div className="absolute inset-0 flex items-end pb-20 sm:pb-28 lg:pb-36">
          <div className="max-w-3xl w-full px-6 lg:px-12">
            <motion.span style={{ opacity: labelOp, y: labelY }}
              className="block text-[11px] tracking-[0.35em] uppercase text-white/70 mb-6 font-medium">
              <span className="text-accent">●</span> Est. 2021 · Indrapuri, Bhopal
            </motion.span>
            <div className="overflow-hidden">
              <motion.h1 style={{ opacity: h1Op, y: h1Y }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[120px] font-display font-medium leading-[0.92] tracking-[-0.04em] text-white">
                Inching closer
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-1">
              <motion.h1 style={{ opacity: h2Op, y: h2Y }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[120px] font-display font-medium leading-[0.92] tracking-[-0.04em] text-white">
                towards <em className="italic text-accent">perfection.</em>
              </motion.h1>
            </div>
            <motion.p style={{ opacity: subOp, y: subY }}
              className="mt-8 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              One company, three divisions. We sell the instruments, train the surveyors, and run the field crews on India&apos;s largest solar, dam, and infrastructure projects.
            </motion.p>
            <motion.div style={{ opacity: btnOp, y: btnY }} className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-3.5 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-all duration-300 hover:scale-[1.02]">Get in Touch</a>
              <a href="#divisions" className="px-8 py-3.5 border border-white/30 text-white text-sm font-medium rounded-sm hover:border-white/60 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02]">Explore Divisions</a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
