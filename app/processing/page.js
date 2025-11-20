"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Processing() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Calculate archetype here based on answers
      const answers = JSON.parse(localStorage.getItem("answers") || "{}");

      // Archetype mapping based on the document:
      // Overgiver: Q2, Q6, Q10 (guilt, self-neglect)
      // Controller: Q3, Q4, Q8 (control, anxiety)
      // Avoider: Q9, Q11, Q13 (emotional distance)
      // Conscious: Q12, Q14, Q15 (awareness, openness)

      const overgiverScore = (answers[2] || 0) + (answers[6] || 0) + (answers[10] || 0);
      const controllerScore = (answers[3] || 0) + (answers[4] || 0) + (answers[8] || 0);
      const avoiderScore = (answers[9] || 0) + (answers[11] || 0) + (answers[13] || 0);
      const consciousScore = (answers[12] || 0) + (answers[14] || 0) + (answers[15] || 0);

      const scores = [
        { name: "Overgiver", score: overgiverScore },
        { name: "Controller", score: controllerScore },
        { name: "Avoider", score: avoiderScore },
        { name: "Conscious", score: consciousScore }
      ];

      // Find the archetype with the highest score
      const primaryArchetype = scores.reduce((prev, current) =>
        (prev.score > current.score) ? prev : current
      );

      localStorage.setItem("result.archetype", primaryArchetype.name);
      router.push("/results");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="flex flex-col gap-6 px-6 py-12 text-center max-w-md mx-auto">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-6"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Sentient', serif" }}>
          Listening to your story... finding your parenting rhythm
        </h2>
        <p className="text-gray-600">Almost there...</p>
      </div>
    </div>
  );
}
