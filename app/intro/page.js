"use client";

import Link from "next/link";

export default function Intro() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-10 px-6 py-12 text-center max-w-2xl mx-auto">
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
          <Link href="/identity">
            <button className="bg-[#a3b18a] hover:bg-[#588157] text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg">
              Continue →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
