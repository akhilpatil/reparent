"use client";

import { useState } from "react";
import Link from "next/link";

export default function Identity() {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    localStorage.setItem("user.role", role);
  };

  const options = [
    { label: "Mother", value: "mother" },
    { label: "Father", value: "father" },
    { label: "Caregiver / Guardian", value: "caregiver" },
    { label: "Prefer not to say", value: "prefer_not_to_say" }
  ];

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-8 px-6 py-12 text-center max-w-md mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-[#1d3b33] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Who are you reflecting as today?
          </h1>
          <p className="text-sm text-gray-600 italic">
            There’s no label that defines you — choose what feels closest right now.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto animate-slide-up delay-200 opacity-0 fill-mode-forwards">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleRoleSelect(option.value)}
              className={`w-full rounded-2xl border px-6 py-4 text-center text-lg font-medium tracking-wide transition-all duration-200 focus:outline-none
                ${selectedRole === option.value
                  ? "border-[#a3b18a] bg-[#dad7cd] text-[#1d3b33] shadow-md"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#a3b18a] hover:bg-[#f4faf6]"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {selectedRole && (
          <div className="animate-fade-in">
            <Link href="/instructions">
              <button className="bg-[#a3b18a] hover:bg-[#588157] text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg mt-4">
                Continue →
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
