"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Welcome() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2.5 seconds (1 sec slower than before)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Remove splash screen after fade animation (e.g., 500ms)
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (showSplash) {
    return (
      <div className={`h-screen w-screen flex items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative w-48 h-24 animate-pulse-soft">
          <Image
            src="/reparent-logo.png"
            alt="Reparent Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden animate-fade-in">
      <div className="flex flex-col gap-10 px-6 py-12 text-center max-w-2xl mx-auto z-10">
        <div className="flex flex-col gap-6">
          <p className="text-2xl text-[#1d3b33] leading-relaxed animate-fade-in" style={{ fontFamily: "var(--font-heading)" }}>
            There is no right or wrong here — just gentle awareness.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed animate-fade-in delay-500 opacity-0 fill-mode-forwards">
            No judgment. No rush.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed animate-fade-in delay-1000 opacity-0 fill-mode-forwards">
            Take a deep breath — this space is just for you.
          </p>
        </div>

        <div className="animate-fade-in delay-1500 opacity-0 fill-mode-forwards mt-8">
          <Link href="/intro">
            <button className="bg-[#a3b18a] hover:bg-[#588157] text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg">
              Continue →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}