"use client";

import Link from "next/link";

export default function Intro() {
  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden animate-fade-in">
      <div className="flex flex-col gap-8 px-6 py-12 text-center max-w-2xl mx-auto z-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1d3b33] leading-tight tracking-tight animate-fade-in" style={{ fontFamily: "var(--font-heading)" }}>
            Parenting begins with understanding ourselves
          </h1>
          <p className="text-lg text-black/70 font-medium leading-relaxed animate-fade-in delay-200 opacity-0 fill-mode-forwards" style={{ fontFamily: "var(--font-sans)" }}>
            This reflection helps you explore how your own childhood patterns shape the way you connect, guide, and love as a parent.
          </p>
        </div>

        <div className="animate-fade-in delay-500 opacity-0 fill-mode-forwards mt-4">
          <Link href="/identity">
            <button className="bg-[#1a1a1a] hover:bg-[#333333] text-white font-medium py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105" style={{ fontFamily: "var(--font-sans)" }}>
              Begin my reflection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
