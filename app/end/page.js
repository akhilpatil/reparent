"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function End() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleReturn = (e) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-8 px-6 py-12 text-center max-w-lg mx-auto">
        {!isExiting ? (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-[#1d3b33] mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Thank you for showing up.
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Awareness is the first act of love — the moment you notice, you begin to heal.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              You’re reparenting yourself even as you nurture your child’s world.
            </p>

            <button
              onClick={handleReturn}
              className="bg-[#a3b18a] hover:bg-[#588157] text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg mb-8"
            >
              Return Home
            </button>

            <p className="text-sm text-gray-600 mt-8">
              Built with care by parents, psychologists, and dreamers.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-2xl text-[#1d3b33] italic" style={{ fontFamily: "var(--font-playfair)" }}>
              Carrying awareness with you...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
