"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShimmerImage from "./ShimmerImage";
import ScrollReveal from "./ScrollReveal";

export default function Showroom() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const curtainX = useTransform(scrollYProgress, [0.15, 0.5], ["0%", "100%"]);

  return (
    <section className="relative min-h-screen flex items-center bg-[#0C0C0C] text-white overflow-hidden py-32 lg:py-0 border-t border-white/[0.06]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] noise-texture" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <ScrollReveal>
            <div>
              <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-6 font-medium">
                <span className="text-accent">—</span> Visit our HQ
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium tracking-tight mb-10 leading-[1.05]">
                Indrapuri,<br /><em className="italic text-accent">Bhopal.</em>
              </h2>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Our headquarters at <span className="text-white font-medium">B-23, Sector-C, Indrapuri</span> doubles as our training centre — explore live Leica equipment, sit in on a class, or talk through a project requirement with our team.
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-12 max-w-lg">
                Walk-ins Mon–Sat · 09:30–19:00 IST. Site visits across Madhya Pradesh, Rajasthan & Karnataka by appointment.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-all duration-300 hover:scale-[1.02]">
                Book a Visit
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </ScrollReveal>

          <div ref={ref} className="relative aspect-[4/3] rounded-none lg:rounded-lg overflow-hidden -mx-6 lg:mx-0">
            <ShimmerImage src="/images/about-inset.jpeg" alt="Shahi Group Bhopal HQ" fill
              className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" dark />
            <motion.div style={{ x: curtainX }} className="absolute inset-0 bg-[#0C0C0C] will-change-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
