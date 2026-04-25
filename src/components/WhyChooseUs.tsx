"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const cards = [
  { number: "01", title: "Vertically Integrated", description: "Hardware, training, and field operations under one roof. The same Leica gear we sell, train on, and deploy on real infrastructure projects." },
  { number: "02", title: "Government-Grade Track Record", description: "Trusted by W.R.D., MPRDC, PHED, MP Transmission, and WALMI for cm-level precision survey work and instrument training." },
  { number: "03", title: "Renewables Heavy", description: "300 MW solar surveyed. 1.5 lakh piles installed in 6 months. Pile alignment & ramming on India's largest single-site solar engagements." },
  { number: "04", title: "Full Lifecycle Offer", description: "Buy the instrument from Enterprises. Train your team at the Academy. Hire our crews from Construction. Or all three." },
  { number: "05", title: "Authentic Leica Partner", description: "Authorised distributor, not a reseller. Direct supply chain, full warranty, ongoing service — and trainers who use the gear daily on site." },
];

function Card({ card }: { card: typeof cards[number] }) {
  return (
    <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-10 overflow-hidden min-h-[380px] flex flex-col">
      <span className="absolute -top-6 -right-2 text-[200px] font-black text-white/[0.04] leading-none select-none pointer-events-none font-display">
        {card.number}
      </span>
      <div className="relative z-10 flex flex-col h-full justify-end">
        <h3 className="text-[22px] font-display font-medium mb-3 tracking-tight text-white">{card.title}</h3>
        <p className="text-[13px] text-white/55 leading-[1.7]">{card.description}</p>
      </div>
    </div>
  );
}

function DesktopCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-55%"]);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-6 pl-6 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pr-32 will-change-transform">
        {cards.map((card) => (
          <motion.div
            key={card.number}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-[340px] sm:w-[380px] cursor-default"
          >
            <Card card={card} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-40 lg:py-48 bg-[#1A1A1A] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 md:mb-20">
        <ScrollReveal>
          <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-6 font-medium">
            <span className="text-accent">—</span> Why work with Shahi
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white mb-6 leading-[1.05]">
            Five reasons we get<br /><em className="italic text-accent">repeat business.</em>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            From timely delivery to government-grade rigor, here&apos;s why solar developers, EPC contractors, and state bodies keep coming back.
          </p>
        </ScrollReveal>
      </div>

      <div className="md:hidden px-6 space-y-6">
        {cards.map((card) => (
          <ScrollReveal key={card.number}>
            <Card card={card} />
          </ScrollReveal>
        ))}
      </div>

      <div className="hidden md:block">
        <DesktopCards />
      </div>
    </section>
  );
}
