"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Delay form appearance for breathing pause
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("user.email", email);
      console.log("Email captured:", email);
    }
    router.push("/end");
  };

  const handleSkip = () => {
    router.push("/end");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbf7] to-[#eef7f2]">
      <div className="flex flex-col gap-8 px-6 py-12 text-center max-w-md mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-[#1d3b33] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
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
              className="text-gray-400 hover:text-gray-600 text-sm underline mt-6 opacity-70 transition-opacity hover:opacity-100"
            >
              Skip for now
            </button>

            <p className="text-xs text-gray-400 mt-4">
              Your journey stays private — always.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
