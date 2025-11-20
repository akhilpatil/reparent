"use client";

import Link from "next/link";
import Header from "../components/Header";

export default function Welcome() {
  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#fdfbf7] to-[#eef7f2]">
      <Header />
      {/* Background Animations */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-100/30 rounded-full blur-3xl animate-breathe"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-green-100/20 rounded-full blur-3xl animate-breathe delay-1000"></div>

      {/* Floating Clouds */}
      <div className="absolute top-[15%] left-[-20%] w-64 h-32 opacity-40 animate-float" style={{ animationDuration: '45s' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
          <path d="M17.5,19c-3.03,0-5.5-2.47-5.5-5.5c0-0.44,0.05-0.86,0.15-1.27c-0.29-0.03-0.58-0.05-0.88-0.05 c-4.14,0-7.5,3.36-7.5,7.5c0,0.37,0.03,0.73,0.09,1.09C4.03,20.93,4.25,21,4.5,21h13c2.48,0,4.5-2.02,4.5-4.5S19.98,12,17.5,12 c-0.23,0-0.45,0.02-0.67,0.06C17.19,12.61,17.5,13.27,17.5,14C17.5,16.76,15.26,19,12.5,19H17.5z" />
          <path d="M19.5,12c-0.23,0-0.45,0.02-0.67,0.06C18.26,8.91,15.66,6.5,12.5,6.5c-3.03,0-5.5,2.47-5.5,5.5 c0,0.44,0.05,0.86,0.15,1.27C3.68,14.06,1,17.19,1,21h3.5c0-4.14,3.36-7.5,7.5-7.5c0.3,0,0.59,0.02,0.88,0.05 C13.36,10.8,15.55,9,18,9c2.48,0,4.5,2.02,4.5,4.5c0,0.23-0.02,0.45-0.06,0.67C22.91,13.81,23,13.4,23,13 C23,10.24,21.43,8,19.5,8z" opacity="0.3" />
          <path d="M6.5,18c0-3.03,2.47-5.5,5.5-5.5c0.3,0,0.59,0.02,0.88,0.05C12.55,9.8,14.74,8,17.19,8c2.48,0,4.5,2.02,4.5,4.5 c0,0.23-0.02,0.45-0.06,0.67C21.91,12.81,22,12.4,22,12c0-2.76-2.24-5-5-5c-2.32,0-4.26,1.59-4.82,3.74C11.6,10.29,11.06,10,10.5,10 c-3.59,0-6.5,2.91-6.5,6.5c0,0.25,0.02,0.5,0.05,0.74C4.03,17.15,4.01,17.58,4.01,18H6.5z" />
        </svg>
      </div>
      <div className="absolute top-[40%] left-[-15%] w-48 h-24 opacity-30 animate-float" style={{ animationDuration: '55s', animationDelay: '5s' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
          <path d="M18.5,12c-0.23,0-0.45,0.02-0.67,0.06C17.26,8.91,14.66,6.5,11.5,6.5c-3.03,0-5.5,2.47-5.5,5.5 c0,0.44,0.05,0.86,0.15,1.27C2.68,14.06,0,17.19,0,21h3.5c0-4.14,3.36-7.5,7.5-7.5c0.3,0,0.59,0.02,0.88,0.05 C12.36,10.8,14.55,9,17,9c2.48,0,4.5,2.02,4.5,4.5c0,0.23-0.02,0.45-0.06,0.67C21.91,13.81,22,13.4,22,13 C22,10.24,20.43,8,18.5,8z" />
        </svg>
      </div>
      <div className="absolute top-[60%] left-[-25%] w-72 h-36 opacity-20 animate-float" style={{ animationDuration: '65s', animationDelay: '2s' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
          <path d="M19.35,10.04C18.67,6.59,15.64,4,12,4C9.11,4,6.6,5.64,5.35,8.04C2.34,8.36,0,10.91,0,14c0,3.31,2.69,6,6,6h13 c2.76,0,5-2.24,5-5C24,12.36,21.95,10.22,19.35,10.04z" />
        </svg>
      </div>

      <div className="flex flex-col gap-8 px-6 py-12 text-center max-w-md mx-auto z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl font-bold text-[#1d3b33] mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Parenting begins with understanding ourselves
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-sans">
            This reflection helps you explore how your own childhood patterns shape the way you connect, guide, and love as a parent.
          </p>
        </div>
        <Link href="/intro">
          <button className="bg-[#a3b18a] hover:bg-[#588157] text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
            Begin my reflection
          </button>
        </Link>
      </div>
    </div>
  );
}