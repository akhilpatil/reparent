"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Questions() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [fadeKey, setFadeKey] = useState(0); // Key to trigger fade animation on question change

  useEffect(() => {
    // Load user role and existing answers from localStorage
    const role = localStorage.getItem("user.role");
    const savedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");
    setUserRole(role);
    setAnswers(savedAnswers);

    // Load questions data
    import("../components/questions-data").then((module) => {
      const questionsData = module.getQuestionsForRole(role);
      setQuestions(questionsData);
    });
  }, []);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestionIndex + 1]: value };
    setAnswers(newAnswers);
    localStorage.setItem("answers", JSON.stringify(newAnswers));

    // Move to next question or processing
    if (currentQuestionIndex < questions.length - 1) {
      setFadeKey(prev => prev + 1); // Trigger fade animation
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push("/processing");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const options = [
    { label: "Highly Disagree", value: 1 },
    { label: "Disagree", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Agree", value: 4 },
    { label: "Highly Agree", value: 5 }
  ];

  if (!currentQuestion) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-green-200 border-t-[#a3b18a] rounded-full mx-auto mb-6"></div>
        </div>
        <p className="text-gray-600">Loading questions...</p>
      </div>
    );
  }

  const showHalfwayMessage = currentQuestionIndex === Math.floor(questions.length / 2) && questions.length > 5;
  const showLastMessage = currentQuestionIndex === questions.length - 1;

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-8 max-w-2xl px-6 py-8 text-left w-full">
        <div className="flex flex-col items-start gap-4">
          <div className="flex min-h-9 w-full items-center gap-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[#4a7c59]"
                aria-label="Previous question"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
            )}
            {currentQuestionIndex === 0 && <span aria-hidden="true" className="h-9 w-9" />}
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a7c59] animate-fade-in">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="mb-6 w-full">
            <div className="h-1.5 w-full rounded-full bg-green-100">
              <div
                className="h-full rounded-full bg-[#a3b18a] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Keep this stage a consistent height so question-specific messages do not move the options. */}
          <div className="relative min-h-[260px] w-full sm:min-h-[220px]">
            <div key={fadeKey} className="animate-fade-in">
              <p className="text-3xl font-medium leading-snug text-[#1d3b33] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {currentQuestion.question}
              </p>

              {/* Microcopy for specific questions or random gentle reminders */}
              <p className="text-sm text-gray-600 italic animate-fade-in delay-500 opacity-0 fill-mode-forwards">
                {currentQuestionIndex % 3 === 0 ? "Take a Deep breath, there is no rush." : ""}
              </p>
            </div>

            {showLastMessage && (
              <div className="absolute inset-x-0 bottom-0 rounded-lg border-l-4 border-[#a3b18a] bg-[#eef7f2] p-5 animate-fade-in">
                <p className="font-medium text-[#1d3b33]">
                  Last one! You’re doing something rare — choosing awareness over reaction.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full max-w-lg mx-auto gap-3 mt-4">
          {options.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-5 text-left text-base font-medium tracking-wide transition-all duration-200 focus:outline-none hover:border-[#a3b18a] hover:bg-[#f4faf6] hover:shadow-sm active:scale-[0.99]"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
