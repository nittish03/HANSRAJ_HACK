"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Relaxation() {
  const [breathText, setBreathText] = useState("Inhale...");
  const [breathCycle, setBreathCycle] = useState(0);
  const [affirmationIndex, setAffirmationIndex] = useState(0);

  const affirmations = [
    "💖 I am strong, resilient, and capable.",
    "🌟 Every day, I am becoming the best version of myself.",
    "💪 I have the power to create change in my life.",
    "😊 I deserve love, joy, and peace.",
    "🌈 My mind is calm, my heart is at peace.",
    "✨ I am enough just as I am."
  ];

  useEffect(() => {
    const cycle = ["Inhale...", "Hold...", "Exhale...", "Hold..."];
    const interval = setInterval(() => {
      setBreathCycle((prev) => (prev + 1) % cycle.length);
      setBreathText(cycle[breathCycle]);
    }, 2000);
    return () => clearInterval(interval);
  }, [breathCycle]);

  // Auto-change affirmation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAffirmationIndex((prev) => (prev + 1) % affirmations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tips = [
    { emoji: "🌿", text: "Focus on deep, slow breathing to calm your nervous system." },
    { emoji: "🌅", text: "Step outside for fresh air and a quick mental reset." },
    { emoji: "📴", text: "Reduce screen time before bed for better relaxation." },
    { emoji: "📖", text: "Try journaling to clear your thoughts and emotions." },
    { emoji: "🎨", text: "Engage in a creative activity like drawing or writing." },
    { emoji: "🤝", text: "Talk to a trusted friend or family member about your feelings." }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🌿 Guided Breathing & Stress-Relief
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Follow along with this guided breathing exercise to relax and relieve stress.
      </motion.p>

      {/* 🌬️ Guided Breathing Animation */}
      <div className="flex flex-col items-center mb-12">
        <motion.div
          className="w-40 h-40 bg-blue-400 rounded-full flex items-center justify-center text-xl font-semibold text-white mb-8"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {breathText}
        </motion.div>
        <p className="text-gray-500 text-lg mt-2">
          Breathe in... Hold... Breathe out... Repeat.
        </p>
      </div>

      {/* 🧘 Stress-Relief Flashcards */}
      <h2 className="text-2xl font-semibold text-center mb-4">🧘 Stress-Relief Tips</h2>
      
      {/* Flashcard Grid - 2 Rows x 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <Flashcard key={index} emoji={tip.emoji} text={tip.text} />
        ))}
      </div>

      {/* ✨ Positive Affirmations */}
      <h2 className="text-2xl font-semibold text-center mt-10 mb-4">🌟 Positive Affirmations</h2>
      <motion.p
        className="text-lg font-semibold text-blue-400 text-center"
        key={affirmationIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.8 }}
      >
        {affirmations[affirmationIndex]}
      </motion.p>
    </div>
  );
}

// Flashcard Component (Flip Stays Until Clicked Again with White Border)
function Flashcard({ emoji, text }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-56 h-32 bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer border border-white perspective-1000"
      onClick={() => setFlipped((prev) => !prev)}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`absolute w-full h-full flex items-center justify-center p-4 text-lg font-semibold text-center rounded-lg transition-transform duration-500 ease-in-out ${
          flipped ? "bg-gray-600 rotate-y-180" : "bg-gray-900"
        }`}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          border: "1px solid white",
        }}
      >
        {flipped ? text : emoji}
      </motion.div>
    </motion.div>
  );
}
