"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  { q: "Do you sell Leica equipment directly?", a: "Yes. Shahi Enterprises is an authorised Leica partner. We supply Total Stations, DGPS, Auto/Digital Levels, 3D Scanners, hydrographic gear, and accessories — with full warranty and ongoing service." },
  { q: "Do you handle field operations end-to-end?", a: "Yes. Shahi Construction runs full surveying and civil works — solar pile alignment & ramming, dam catchment surveys, road corridor topography, DPR preparation, soil investigation, and equipment rental. Active across MP, Rajasthan, and Karnataka." },
  { q: "What training courses do you offer and at what cost?", a: "Total Station: ₹25,000 (1 week). DGPS: ₹30,000 (1 week). We also teach Auto Level, Digital Level, Drone, AutoCAD, QGIS, STAAD Pro, MS Road, and Water Gems. Government and enterprise cohorts available — we've trained W.R.D., WALMI, and Oriental Group officers on our gear." },
  { q: "Can I rent equipment instead of buying?", a: "Yes. We rent out our full instrument range — Total Stations, DGPS, Levels, scanners — for short or long engagements. Useful when you need cm-level precision for a specific project but don't want capex." },
  { q: "Which clients have you worked with?", a: "TATA Power Solar, Adani Power, AVAADA, Siemens Gamesa, SUNTAP, RENO Energy, L&T, NCC, Oriental Group, MP Transmission, MPRDC, WRD, PHED, LNCT, and SAGE University Bhopal — among others." },
];

function Item({ q, a, open, toggle, id }: { q: string; a: string; open: boolean; toggle: () => void; id: number }) {
  const headingId = `faq-heading-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        id={headingId}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base sm:text-lg font-medium pr-4 text-white group-hover:text-accent transition-colors">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          className="text-2xl text-accent shrink-0 leading-none" aria-hidden="true">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="text-sm sm:text-base text-white/60 leading-relaxed pb-6 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-32 lg:py-40 border-t border-white/[0.06] bg-[#0C0C0C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <ScrollReveal>
            <div className="lg:sticky lg:top-32">
              <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-6 font-medium">
                <span className="text-accent">—</span> FAQ
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-6 text-white leading-[1.05]">
                Your goals,<br /><em className="italic text-accent">our priority.</em>
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-md">
                Quick answers on hardware, field operations, training, rentals, and clients. Anything else — we&apos;ll reply within one business day.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="border-t border-white/[0.08]">
              {faqs.map((f, i) => (
                <Item key={f.q} q={f.q} a={f.a} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? null : i)} id={i} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
