"use client";

import Link from "next/link";

export default function Instructions() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbf7] to-[#eef7f2]">
      <div className="flex flex-col gap-10 px-6 py-12 text-center max-w-lg mx-auto">
        <div className="animate-fade-in flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-[#1d3b33] leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Parenting isn’t about being perfect — it’s about being present.
          </h1>
          <div className="flex flex-col gap-4 text-lg text-gray-600">
            <p>Each question is a gentle mirror.</p>
            <p>It’s not about right or wrong — it’s about noticing.</p>
            <p>With every reflection, you’ll understand yourself a little better.</p>
          </div>
        </div>

        <div className="animate-fade-in delay-1000 opacity-0 fill-mode-forwards">
          <Link href="/questions">
            <button className="bg-[#a3b18a] hover:bg-[#588157] text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 animate-pulse-soft">
              Let’s start →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
