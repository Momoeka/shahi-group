"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Survey", "Train", "Build"];
const ANIM_DURATION = 2700;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startTime = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  const mountedRef = useRef(true);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick(now: number) {
      if (!mountedRef.current) return;
      if (!startTime.current) startTime.current = now;
      const elapsed = now - startTime.current;
      const p = Math.min(elapsed / ANIM_DURATION, 1);
      setProgress(Math.floor(p * 100));
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        timeoutId = setTimeout(() => {
          if (mountedRef.current) onCompleteRef.current();
        }, 400);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let count = 0;
    const iv = setInterval(() => {
      count++;
      if (count >= words.length - 1) {
        setWordIndex(words.length - 1);
        clearInterval(iv);
      } else {
        setWordIndex(count);
      }
    }, 900);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col justify-between p-5 sm:p-8 md:p-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="text-[11px] tracking-[0.3em] uppercase text-white/50 font-medium">
          Shahi Group
        </span>
      </motion.div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white/80 select-none font-display italic"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex items-end justify-between">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[11px] tracking-[0.2em] uppercase text-white/25 font-medium"
        >
          Inching Closer Towards Perfection
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tabular-nums select-none"
        >
          {String(progress).padStart(3, "0")}
        </motion.span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.06]">
        <motion.div
          className="h-full bg-accent origin-left will-change-transform"
          style={{
            scaleX: progress / 100,
            boxShadow: "0 0 10px rgba(200,16,46,0.4)",
          }}
        />
      </div>
    </motion.div>
  );
}
