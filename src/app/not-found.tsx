import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C] px-6">
      <div className="text-center max-w-md">
        <span className="block text-[11px] tracking-[0.35em] uppercase text-white/30 mb-6 font-medium">
          Page not found
        </span>
        <h1 className="text-7xl sm:text-9xl font-black text-white mb-4 font-display">404</h1>
        <p className="text-white/40 text-base mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-8 py-3.5 bg-white text-black text-sm font-medium rounded-sm hover:bg-white/90 transition-all duration-300 inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
