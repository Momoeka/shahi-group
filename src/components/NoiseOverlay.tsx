"use client";

export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04] noise-texture"
    />
  );
}
