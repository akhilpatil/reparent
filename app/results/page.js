"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const archetypeData = {
  Overgiver: {
    title: "Overgiver",
    image: "/architypes/overgiver.png",
    quote: "“I learned to love by giving parts of myself away.”",
    description: "You care deeply and give more than you receive. Your kindness is real, but it becomes heavy when you overextend to feel worthy or valued. Healing begins when you give yourself the same care you freely offer others — without guilt, without overthinking.",
    coreWound: "“Love must be earned through sacrifice.”",
    healingDirection: "Learn to include yourself in the love you give. Setting boundaries, receiving support, and choosing yourself is how you return home to your own heart.",
    palette: {
      primary: "#D8A7B1", // Dusty Rose
      secondary: "#F7D1C4", // Soft Peach
      accent: "#E8A598", // Muted Coral
      background: "#FFF7F2", // Ivory
      text: "#5D4037" // Dark Brown
    }
  },
  Controller: {
    title: "Controller",
    image: "/architypes/controller.png",
    quote: "“If I manage everything, maybe nothing will fall apart again.”",
    description: "You hold everything together — plans, emotions, people — because unpredictability once hurt you. You’re responsible and reliable, but you carry more than any one person should. When you soften your grip, you discover that safety can come not just from control, but from trust and support.",
    coreWound: "“If I don’t control it, I won’t be safe.”",
    healingDirection: "Practice releasing tiny bits of control and allowing trust to grow. Safety comes not from managing everything, but from knowing you can handle whatever arises.",
    palette: {
      primary: "#1E5F74", // Deep Teal
      secondary: "#4A6FA5", // Slate Blue
      accent: "#8C9BAA", // Steel Grey
      background: "#E2EFF6", // Soft Ice Blue
      text: "#102A33" // Dark Teal
    }
  },
  Avoider: {
    title: "Avoider",
    image: "/architypes/avoider.png",
    quote: "“When feelings get too loud, I disappear to survive.”",
    description: "You protect yourself by stepping back — from conflict, deep emotions, or closeness. It’s not disinterest, it’s a shield you built long ago. You want connection but fear being overwhelmed or misunderstood. Healing happens when you stay present long enough for someone to truly know you.",
    coreWound: "“My emotions don’t matter, so distance keeps me safe.”",
    healingDirection: "Stay present through discomfort long enough to let connection reach you. Safety grows when you allow yourself to be seen without disappearing.",
    palette: {
      primary: "#3A5A40", // Forest Green
      secondary: "#A3B9A5", // Sage
      accent: "#DCE7D3", // Soft Moss
      background: "#FAFDF8", // Off White
      text: "#1A2F1D" // Dark Green
    }
  },
  Conscious: {
    title: "Conscious / Balanced",
    image: "/architypes/balanced.png",
    quote: "“I respond, not react — and I don’t lose myself in love.”",
    description: "You move through life with awareness and emotional clarity. You pause, reflect, and choose your responses instead of being driven by old patterns. This doesn’t mean you’re perfect — it means you’re present, growing, and connected to yourself. You honour your needs while respecting others.",
    coreWound: "“I must stay aware so I don’t repeat the past.”",
    healingDirection: "Keep choosing awareness over old patterns. Respond, pause, breathe — this is the version of you that builds healthy, steady love.",
    palette: {
      primary: "#C7A86C", // Muted Gold
      secondary: "#D9C7A3", // Golden Beige
      accent: "#EFE8D8", // Soft Sand
      background: "#FBFAF7", // Cloud White
      text: "#4A3F2A" // Dark Brown
    }
  }
};

export default function Results() {
  const [archetypeKey, setArchetypeKey] = useState("");

  useEffect(() => {
    const savedArchetype = localStorage.getItem("result.archetype");
    if (savedArchetype) {
      setArchetypeKey(savedArchetype);
    }
  }, []);

  if (!archetypeKey) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading results...</div>;
  }

  const data = archetypeData[archetypeKey] || archetypeData["Conscious"]; // Fallback

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 transition-colors duration-500" style={{ backgroundColor: data.palette.background }}>
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in border-4" style={{ borderColor: data.palette.secondary }}>

        {/* Header Section */}
        <div className="px-8 py-10 text-center relative overflow-hidden" style={{ backgroundColor: data.palette.secondary + '33' }}>
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: data.palette.primary }}>
              {data.title}
            </h1>

            <div className="relative w-64 h-64 mb-6 shadow-lg rounded-2xl overflow-hidden">
              <Image
                src={data.image}
                alt={`${data.title} Archetype`}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-xl italic font-medium leading-relaxed px-2 md:px-8" style={{ color: data.palette.text, opacity: 0.9, fontFamily: "var(--font-playfair)" }}>
              {data.quote}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 md:px-10 py-10 space-y-8">

          {/* Main Description */}
          <div>
            <p className="text-lg leading-relaxed text-gray-700">
              {data.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Core Wound */}
            <div className="p-6 rounded-2xl transition-transform hover:scale-[1.02] duration-300" style={{ backgroundColor: data.palette.background, borderLeft: `4px solid ${data.palette.accent}` }}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: data.palette.primary }}>
                Core Wound
              </h3>
              <p className="text-gray-800 font-medium italic">
                {data.coreWound}
              </p>
            </div>

            {/* Healing Direction */}
            <div className="p-6 rounded-2xl transition-transform hover:scale-[1.02] duration-300" style={{ backgroundColor: data.palette.background, borderLeft: `4px solid ${data.palette.primary} ` }}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: data.palette.primary }}>
                Healing Direction
              </h3>
              <p className="text-gray-800">
                {data.healingDirection}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6 text-center">
            <Link href="/email-capture">
              <button
                className="font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{
                  backgroundColor: data.palette.primary,
                  color: '#fff'
                }}
              >
                Learn how to balance my energy →
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
