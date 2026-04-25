"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C] px-6">
      <div className="text-center max-w-md">
        <span className="block text-[11px] tracking-[0.35em] uppercase text-white/30 mb-6 font-medium">
          Something went wrong
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">
          Unexpected Error
        </h1>
        <p className="text-white/40 text-base mb-10 leading-relaxed">
          We encountered an issue loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-8 py-3.5 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
