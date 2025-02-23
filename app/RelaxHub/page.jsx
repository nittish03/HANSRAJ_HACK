"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Relaxation() {
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const affirmations = [
    "💖 I am strong, resilient, and capable.",
    "🌟 Every day, I am becoming the best version of myself.",
    "💪 I have the power to create change in my life.",
    "😊 I deserve love, joy, and peace.",
    "🌈 My mind is calm, my heart is at peace.",
    "✨ I am enough just as I am."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAffirmationIndex((prev) => (prev + 1) % affirmations.length);
    }, 4000);
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

const audioTracks = [
    { title: "🌊 Ocean Waves", src: "/assets/audio/ocean.mp3" },
    { title: "🌿 Forest Birds", src: "/assets/audio/bird.mp3" },
    { title: "🔥 Campfire Sounds", src: "/assets/audio/fire.mp3" },
    { title: "🌧️ Rain Sounds", src: "/assets/audio/rain.mp3" },
    { title: "🎧 ASMR Whispering", src: "/assets/audio/whispering.mp3" },
    { title: "🎵 White Noise", src: "/assets/audio/white.mp3" }
];





  const togglePlay = (track) => {
    if (currentTrack && currentTrack.src !== track.src) {
      currentTrack.audio.pause();
    }

    if (!currentTrack || currentTrack.src !== track.src) {
      const newAudio = new Audio(track.src);
      setCurrentTrack({ ...track, audio: newAudio });
      newAudio.play();
      setIsPlaying(true);
      newAudio.onended = () => setIsPlaying(false);
    } else {
      if (isPlaying) {
        currentTrack.audio.pause();
        setIsPlaying(false);
      } else {
        currentTrack.audio.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🌿 Stress-Relief Flashcards, Positive Affirmations & Calming Sounds
      </motion.h1>

      {/* 🎵 Calming Sounds */}
      <h2 className="text-2xl font-semibold text-center mb-4">🎵 Calming Sounds</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {audioTracks.map((track, index) => (
          <button
            key={index}
            onClick={() => togglePlay(track)}
            className={`p-4 rounded-lg shadow-md transition ${
              currentTrack?.src === track.src && isPlaying ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            <h2 className="text-lg font-semibold text-black">{track.title}</h2>
            <p className="mt-2 text-sm text-gray-500">
              {currentTrack?.src === track.src && isPlaying ? "🔊 Playing..." : "▶️ Click to Play"}
            </p>
          </button>
        ))}
      </div>

      {/* 🧘 Stress-Relief Flashcards */}
      <h2 className="text-2xl font-semibold text-center mt-10 mb-4">🧘 Stress-Relief Tips</h2>
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
