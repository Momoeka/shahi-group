"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ScrollReveal({
  children, delay = 0, className = "", y = 40, x = 0,
}: {
  children: ReactNode; delay?: number; className?: string; y?: number; x?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
