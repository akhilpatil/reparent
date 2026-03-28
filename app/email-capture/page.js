"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [archetype, setArchetype] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Get archetype from localStorage
    const savedArchetype = localStorage.getItem("result.archetype");
    if (savedArchetype) {
      setArchetype(savedArchetype);
    }

    // Delay form appearance for breathing pause
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("user.email", email);

      // Save to Google Sheets and send email via Resend
      try {
        await fetch('/api/save-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            archetype: archetype || 'Unknown',
            userName: '' // You can add a name field if you want
          })
        });
      } catch (error) {
        console.error('Failed to save email:', error);
        // Continue anyway - don't block user flow
      }
    }
    router.push("/end");
  };

  const handleSkip = () => {
    router.push("/end");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-8 px-6 py-12 text-center max-w-md mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-[#1d3b33] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Would you like to go deeper?
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Receive a personalized Reparent Guide with reflections to help you nurture your inner child and bring more calm, balance, and connection to your parenting.
          </p>

          <div className={`transition-opacity duration-1000 ${showForm ? 'opacity-100' : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#a3b18a] focus:outline-none focus:ring-2 focus:ring-green-100 bg-white/80 backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                className="bg-[#a3b18a] hover:bg-[#588157] text-white font-semibold py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Send my Reparent guide
              </button>
            </form>

            <button
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-800 text-sm underline mt-6 font-bold transition-colors"
            >
              Skip for now
            </button>

            <p className="text-xs text-gray-600 mt-4 font-bold">
              Your journey stays private — always.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
