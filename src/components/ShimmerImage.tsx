"use client";

import { useState, ComponentProps } from "react";
import Image from "next/image";

type Props = ComponentProps<typeof Image> & { dark?: boolean };

export default function ShimmerImage({ dark = false, className = "", onLoad, ...props }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div
          className="absolute inset-0 img-shimmer"
          style={
            dark
              ? {
                  background: "linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s ease-in-out infinite",
                }
              : undefined
          }
        />
      )}
      <Image
        {...props}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={(e) => {
          setLoaded(true);
          if (typeof onLoad === "function") onLoad(e);
        }}
      />
    </div>
  );
}
