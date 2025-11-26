"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Welcome() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500);

    // Remove splash screen after fade animation (e.g., 500ms)
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (showSplash) {
    return (
      <div className={`h-screen w-screen flex items-center justify-center bg-[#fdfbf7] transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
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

      <div className="flex flex-col gap-8 px-6 py-12 text-center max-w-2xl mx-auto z-10">
        <div className="animate-fade-in flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            There is no right or wrong here — just gentle awareness.
          </h1>
          <p className="text-lg text-black/70 font-medium leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
            No judgment. No rush.<br />
            Take a deep breath — this space is just for you.
          </p>
        </div>
        <Link href="/intro" className="mt-4">
          <button className="bg-[#1a1a1a] hover:bg-[#333333] text-white font-medium py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105" style={{ fontFamily: "var(--font-sans)" }}>
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}