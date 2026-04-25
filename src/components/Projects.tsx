"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    tag: "Renewables · Flagship",
    title: "300 MW Solar Ramming",
    location: "Bikaner, Rajasthan",
    metric: "1,50,000 piles · 200 acres · 6 months",
    copy: "Pile alignment, ramming, and survey for one of the largest single-site utility-scale solar engagements in the region. Likely client cluster: TATA Power Solar, AVAADA, Adani, Siemens Gamesa.",
    image: "/images/project-bikaner-solar.png",
  },
  {
    tag: "Hydrography",
    title: "Dam & Reservoir Survey",
    location: "Madhya Pradesh",
    metric: "10,000 hectares · 3 months",
    copy: "Catchment-area survey using Leica DGPS and Total Station. Deliverables: contour map, river cross-section, longitudinal section. Demonstrates marine/hydrographic capability.",
    image: "/images/project-dam.jpeg",
  },
  {
    tag: "Infrastructure",
    title: "110 KM Road Corridor",
    location: "State Highway",
    metric: "Topography + centerline marking",
    copy: "Linear-corridor survey with DGPS and Total Station for alignment; Auto-Level and Digital Level for original ground level capture.",
    image: "/images/project-road.jpeg",
  },
  {
    tag: "Ongoing",
    title: "Karnataka State Highway",
    location: "Karnataka",
    metric: "DGPS topographic surveys",
    copy: "Active state highway improvement project. Centimeter-level precision with real-time data updates across a large-scale corridor.",
    image: "/images/project-karnataka.jpeg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 lg:py-40 bg-[#0C0C0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 lg:mb-24 max-w-2xl">
            <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-6 font-medium">
              <span className="text-accent">—</span> Selected work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white mb-6 leading-[1.05]">
              Real projects.<br /><em className="italic text-accent">Real numbers.</em>
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              From utility-scale solar to dam catchments and state highway corridors — a sample of recent and ongoing engagements.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={(i % 2) * 0.15}>
              <article className="group">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-white/[0.04]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/15 rounded-full text-[11px] tracking-[0.18em] uppercase text-white/80 font-medium">
                    {p.tag}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
                  <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-white">{p.title}</h3>
                  <span className="text-[12px] tracking-wider uppercase text-white/40">{p.location}</span>
                </div>
                <p className="text-accent text-sm font-medium mb-4 font-mono">{p.metric}</p>
                <p className="text-white/55 text-sm sm:text-base leading-relaxed">{p.copy}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
