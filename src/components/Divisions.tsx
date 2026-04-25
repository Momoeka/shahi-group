"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const divisions = [
  {
    num: "01",
    name: "Shahi Enterprises",
    role: "Hardware & Dealership",
    tagline: "The instruments that build the country.",
    copy: "Wholesale trader and authorised Leica partner. Total stations, DGPS, 3D scanners, hydrographic gear — the same equipment our field crews carry every day.",
    capabilities: [
      "Total Station & Robotic Total Station",
      "DGPS — centimeter-level GNSS positioning",
      "Automatic & Digital Level instruments",
      "Cable Locator — underground utility detection",
      "Laser Distance Meter",
      "3D Scanner — point-cloud capture",
      "Marine & Hydrographic equipment",
    ],
    image: "/images/div-enterprises.png",
  },
  {
    num: "02",
    name: "Shahi Construction",
    role: "Field Operations",
    tagline: "Boots in the dirt. Numbers on the page.",
    copy: "Field operations arm. Surveying and civil works on real infrastructure — solar farms, dams, state highways, government projects across MP, Rajasthan, Karnataka.",
    capabilities: [
      "Land & Topographic surveying",
      "Engineering & Construction surveying",
      "Solar pile alignment & ramming",
      "DPR (Detailed Project Report) preparation",
      "Soil investigation & traffic surveys",
      "Structural & architectural design",
      "Equipment rental",
    ],
    image: "/images/div-construction.png",
  },
  {
    num: "03",
    name: "Shahi Survey Academy",
    role: "Training & Certification",
    tagline: "The same instruments. The same expertise.",
    copy: "Hands-on training arm. Real Leica gear, real instructors. Courses for fresh graduates, working professionals, and government cohorts — including W.R.D., WALMI, and Oriental Group.",
    capabilities: [
      "Total Station — ₹25,000 · 1 week",
      "DGPS — ₹30,000 · 1 week",
      "Auto Level, Digital Level, Drone",
      "AutoCAD · QGIS · STAAD Pro",
      "MS Road · Water Gems",
      "Topography, contour, layout, area & volume",
      "Government & enterprise cohorts",
    ],
    image: "/images/div-academy.png",
  },
];

function DivisionRow({ d, index }: { d: typeof divisions[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.95, 1]);
  const reverse = index % 2 === 1;

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 lg:py-24">
      <motion.div
        style={{ scale }}
        className={`lg:col-span-7 relative aspect-[4/3] rounded-lg overflow-hidden will-change-transform ${reverse ? "lg:order-2" : ""}`}
      >
        <Image
          src={d.image}
          alt={d.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-6 left-6 text-[11px] tracking-[0.35em] uppercase text-white/70 font-medium">
          <span className="text-accent">—</span> Division {d.num}
        </div>
      </motion.div>

      <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <ScrollReveal x={reverse ? -40 : 40} y={0}>
          <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-4 font-medium">
            {d.role}
          </span>
        </ScrollReveal>
        <ScrollReveal x={reverse ? -40 : 40} y={0} delay={0.1}>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white mb-4 leading-[1.05]">
            {d.name}
          </h3>
        </ScrollReveal>
        <ScrollReveal x={reverse ? -40 : 40} y={0} delay={0.15}>
          <p className="text-accent italic text-base sm:text-lg mb-6 font-display">
            {d.tagline}
          </p>
        </ScrollReveal>
        <ScrollReveal x={reverse ? -40 : 40} y={0} delay={0.2}>
          <p className="text-white/60 text-base leading-relaxed mb-6">
            {d.copy}
          </p>
        </ScrollReveal>
        <ScrollReveal x={reverse ? -40 : 40} y={0} delay={0.3}>
          <ul className="space-y-2">
            {d.capabilities.map((c) => (
              <li key={c} className="text-sm text-white/55 flex items-start gap-3">
                <span className="text-accent mt-0.5 shrink-0">▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default function Divisions() {
  return (
    <section id="divisions" className="py-32 lg:py-40 bg-[#0C0C0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 lg:mb-24 max-w-2xl">
            <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-6 font-medium">
              <span className="text-accent">—</span> Three divisions, one company
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white mb-6 leading-[1.05]">
              The same Leica gear,<br /><em className="italic text-accent">in three contexts.</em>
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              We sell the instrument, train you on it, and use it daily on infrastructure projects. The same proof point appears in every division.
            </p>
          </div>
        </ScrollReveal>
        <div className="divide-y divide-white/[0.06]">
          {divisions.map((d, i) => (
            <DivisionRow key={d.num} d={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
