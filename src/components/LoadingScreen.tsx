"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ANIM_DURATION = 2200;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
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
      setProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        timeoutId = setTimeout(() => {
          if (mountedRef.current) onCompleteRef.current();
        }, 350);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col items-center justify-center gap-6 px-6"
    >
      <span className="text-2xl sm:text-3xl tracking-[0.3em] uppercase text-white font-semibold">
        SHAHI GROUP
      </span>

      <div className="w-[220px] sm:w-[280px] h-[2px] bg-white/10 overflow-hidden">
        <div
          className="h-full bg-accent origin-left"
          style={{
            transform: `scaleX(${progress})`,
            boxShadow: "0 0 12px rgba(200,16,46,0.6)",
            transition: "transform 80ms linear",
          }}
        />
      </div>
    </motion.div>
  );
}
