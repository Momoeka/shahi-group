"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShimmerImage from "./ShimmerImage";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0.05, 0.4], [0.9, 1]);
  const imgOp = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  return (
    <section id="about" className="min-h-screen flex items-center py-32 lg:py-40 bg-[#0C0C0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div ref={imgRef} style={{ scale: imgScale, opacity: imgOp }}
            className="relative aspect-[4/5] rounded-none lg:rounded-lg overflow-hidden will-change-transform -mx-6 lg:mx-0">
            <ShimmerImage src="/images/about-portrait.png" alt="Shahi Group team in the field" fill
              className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" dark />
          </motion.div>
          <div>
            <ScrollReveal x={60} y={0}>
              <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-6 font-medium">
                <span className="text-accent">—</span> About Us
              </span>
            </ScrollReveal>
            <ScrollReveal x={60} y={0} delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium tracking-tight mb-10 text-white">
                Vertically integrated <em className="italic text-accent">survey house.</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal x={60} y={0} delay={0.2}>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                One company that sells you the instrument, trains your team on it, and uses the same Leica gear daily on government and renewables-grade infrastructure projects.
              </p>
            </ScrollReveal>
            <ScrollReveal x={60} y={0} delay={0.3}>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Founded in 2021 in Indrapuri, Bhopal, Shahi Group operates across Madhya Pradesh, Rajasthan, and Karnataka — delivering large-scale solar, dam, and highway survey work for clients like TATA Power, Adani, L&amp;T, Siemens Gamesa, and government bodies including WRD, MPRDC, and PHED.
              </p>
            </ScrollReveal>
            <ScrollReveal x={60} y={0} delay={0.4}>
              <div className="flex flex-wrap gap-3 mt-8">
                {["Timely delivery", "Authentic Leica gear", "Government-grade rigor"].map((b) => (
                  <span key={b} className="inline-flex items-center px-4 py-2 border border-white/15 rounded-full text-[12px] text-white/70 font-medium tracking-wide">
                    {b}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
