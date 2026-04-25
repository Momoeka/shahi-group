"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { siteConfig } from "@/lib/siteConfig";

const words = ["Tell", "us", "about", "your", "project."];

const pop = (delay: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submitted = useRef({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage || !topic) {
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    submitted.current = { name: trimmedName, email: trimmedEmail, message: trimmedMessage };

    // Simulate API call. Replace with real endpoint later.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
    setName(""); setEmail(""); setPhone(""); setTopic(""); setMessage("");
  }

  return (
    <section id="contact" className="py-32 lg:py-44 bg-[#0C0C0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="block text-[11px] tracking-[0.35em] uppercase text-white/40 mb-10 font-medium">
            <span className="text-accent">—</span> Get in touch
          </span>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`text-4xl sm:text-5xl lg:text-7xl font-display font-medium text-white tracking-tight ${i === words.length - 1 ? "italic text-accent" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <p className="text-white/50 text-base sm:text-lg mb-12 max-w-md mx-auto">
            Solar, dam, road, training, rentals — we reply within one business day.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.7}>
          <div className="relative max-w-xl mx-auto mb-16">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center py-16"
                >
                  <motion.div
                    {...pop(0.2)}
                    className="w-[72px] h-[72px] rounded-full bg-accent/10 flex items-center justify-center mb-6"
                  >
                    <svg width="36" height="36" viewBox="0 0 52 52">
                      <circle cx="26" cy="26" r="25" fill="none" stroke="#C8102E" strokeWidth="2"
                        strokeDasharray="166" strokeDashoffset="166" className="animate-checkCircle" />
                      <path d="M14 27l7 7 16-16" fill="none" stroke="#C8102E" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round"
                        strokeDasharray="48" strokeDashoffset="48" className="animate-checkMark" />
                    </svg>
                  </motion.div>
                  <motion.h3 {...pop(0.4)} className="text-2xl sm:text-3xl font-display font-medium text-white mb-2">
                    Message Sent
                  </motion.h3>
                  <motion.p {...pop(0.5)} className="text-white/50 text-sm sm:text-base max-w-xs mb-8 leading-relaxed">
                    Thank you, {submitted.current.name}. We&apos;ll get back to you within one business day.
                  </motion.p>
                  <motion.button
                    {...pop(0.7)}
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 border border-white/[0.15] text-white text-sm font-medium rounded-sm hover:bg-white/[0.05] transition-all duration-300"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="text-left space-y-5"
                >
                  <div>
                    <label htmlFor="contact-name" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-2 font-medium">Name</label>
                    <input id="contact-name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-transparent border border-white/[0.12] rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="Your name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-2 font-medium">Email</label>
                      <input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "sending"}
                        className="w-full bg-transparent border border-white/[0.12] rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                        placeholder="you@company.com" />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-2 font-medium">Phone</label>
                      <input id="contact-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                        disabled={status === "sending"}
                        className="w-full bg-transparent border border-white/[0.12] rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                        placeholder="+91 ..." />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-topic" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-2 font-medium">I&apos;m interested in</label>
                    <select id="contact-topic" required value={topic} onChange={(e) => setTopic(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-[#0C0C0C] border border-white/[0.12] rounded-sm px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors disabled:opacity-50">
                      <option value="">Select a service</option>
                      <option>Buying Leica instruments (Enterprises)</option>
                      <option>Site / field operations (Construction)</option>
                      <option>Training (Academy)</option>
                      <option>Equipment rental</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-2 font-medium">Project Brief</label>
                    <textarea id="contact-message" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-transparent border border-white/[0.12] rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none transition-colors resize-none disabled:opacity-50"
                      placeholder="Tell us about your project..." />
                  </div>

                  {status === "error" && (
                    <p className="text-accent text-sm text-center">Please fill all required fields with valid info.</p>
                  )}

                  <div className="text-center pt-2">
                    <button type="submit" disabled={status === "sending"}
                      className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100">
                      {status === "sending" ? "Sending..." : "Send Enquiry"}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <div className="flex flex-col items-center gap-4">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3 text-white/60 hover:text-white text-lg sm:text-xl lg:text-2xl font-medium transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {siteConfig.email}
            </a>
            {siteConfig.phonesDisplay.map((p, i) => (
              <a key={p} href={`tel:${siteConfig.phones[i]}`} className="inline-flex items-center gap-3 text-white/60 hover:text-white text-lg sm:text-xl lg:text-2xl font-medium transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {p}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
