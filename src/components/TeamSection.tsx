"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const team = [
  { name: "Faisal Shahi", role: "Director" },
  { name: "Fahad Shahi", role: "Managing Director" },
  { name: "Farman Shahi", role: "General Manager" },
  { name: "Deepak Prakash", role: "Site Engineer" },
];

export default function TeamSection() {
  return (
    <section className="min-h-screen flex items-center py-32 lg:py-40 bg-[#0C0C0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <ScrollReveal>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image src="/images/about-secondary.png" alt="Shahi Group leadership" fill
                className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal x={60} y={0}>
              <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-6 font-medium">
                <span className="text-accent">—</span> Leadership
              </span>
            </ScrollReveal>
            <ScrollReveal x={60} y={0} delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium tracking-tight mb-10 text-white leading-[1.05]">
                The people behind <em className="italic text-accent">Shahi.</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal x={60} y={0} delay={0.2}>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
                A family-led leadership with deep field experience across surveying, civil works, and government-grade infrastructure delivery.
              </p>
            </ScrollReveal>
            <ScrollReveal x={60} y={0} delay={0.3}>
              <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
                {team.map((m) => (
                  <li key={m.name} className="flex items-baseline justify-between py-5 gap-4">
                    <span className="text-lg sm:text-xl font-display font-medium text-white tracking-tight">{m.name}</span>
                    <span className="text-[12px] tracking-[0.18em] uppercase text-white/45 text-right shrink-0">{m.role}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal x={60} y={0} delay={0.4}>
              <blockquote className="mt-10 border-l-2 border-accent/60 pl-6 italic text-white/65 text-base sm:text-lg leading-relaxed font-display">
                &ldquo;The same Leica gear in three contexts — that&apos;s the proof point. We don&apos;t just sell, train, or operate. We do all three, and we hold ourselves to the same standard in each.&rdquo;
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
