"use client";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { number: 300, suffix: " MW", label: "Solar Capacity Surveyed", desc: "Bikaner utility-scale solar — pile alignment & ramming, 200 acres." },
  { number: 150000, suffix: "", label: "Piles Installed (6 months)", desc: "1.5 lakh piles delivered on a single solar engagement." },
  { number: 10000, suffix: " ha", label: "Dam Catchment Surveyed", desc: "Leica DGPS + Total Station — contour, river X-section, L-section." },
  { number: 110, suffix: " KM", label: "Road Corridor Mapped", desc: "Linear-corridor survey with DGPS, Auto-Level & Digital Level." },
  { number: 15, suffix: "+", label: "Enterprise & Govt Clients", desc: "TATA Power, Adani, L&T, Siemens, NCC, MPRDC, WRD, PHED, and more." },
  { number: 3, suffix: "", label: "Active Divisions", desc: "Hardware (Enterprises) · Field Operations (Construction) · Training (Academy)." },
];

export default function Stats() {
  return (
    <section id="numbers" className="py-32 lg:py-44 border-t border-white/[0.06] bg-[#0C0C0C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 lg:mb-24 max-w-2xl">
            <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-6 font-medium">
              <span className="text-accent">—</span> Our impact in numbers
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white mb-6 leading-[1.05]">
              Boots in the dirt.<br /><em className="italic text-accent">Numbers on the page.</em>
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              Real infrastructure, delivered on real timelines. Pulled directly from project sign-offs across solar, hydrography, and state highway work.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/[0.08]">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={(i % 3) * 0.1}>
              <div className={`py-10 lg:py-12 lg:px-8 border-b border-white/[0.08] ${i % 3 !== 0 ? "lg:border-l" : ""} sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:lg:border-r-0`}>
                <div className="text-4xl sm:text-5xl lg:text-[56px] font-display font-medium text-white mb-4 tracking-tight">
                  <AnimatedCounter target={s.number} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">{s.label}</div>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
