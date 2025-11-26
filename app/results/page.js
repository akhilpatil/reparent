"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const archetypeDescriptions = {
  Overgiver: "You tend to prioritize others' needs above your own, often at the expense of your own well-being. This comes from a deep desire to be needed and loved, but can lead to burnout and resentment.",
  Controller: "You seek to maintain control in situations to feel safe and secure. This pattern often stems from childhood experiences where control was necessary for survival, but can create tension in relationships.",
  Avoider: "You tend to distance yourself emotionally to protect against vulnerability. This coping mechanism developed to shield you from pain, but can prevent deep connections and intimacy.",
  Conscious: "You demonstrate awareness of your patterns and actively work toward balance. You understand that healing your inner child allows you to show up more fully as a parent."
};

export default function Results() {
  const [archetype, setArchetype] = useState("");

  useEffect(() => {
    const savedArchetype = localStorage.getItem("result.archetype");
    if (savedArchetype) {
      setArchetype(savedArchetype);
    }
  }, []);

  if (!archetype) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading results...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-8 px-6 py-12 text-center max-w-lg mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-[#1d3b33] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            You are a <span className="text-[#4a7c59]">{archetype} Parent</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {archetypeDescriptions[archetype]}
          </p>
        </div>

        <Link href="/email-capture">
          <button className="bg-[#a3b18a] hover:bg-[#588157] text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Learn how to balance my energy →
          </button>
        </Link>
      </div>
    </div>
  );
}
