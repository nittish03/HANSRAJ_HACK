"use client";
import { useState } from "react";

export default function CalmingSounds() {
  // 🎵 List of calming audio tracks
  const audioTracks = [
    {
      title: "🌊 Ocean Waves",
      src: "/assets/audio/ocean-waves.mp3",
    },
    {
      title: "🌿 Forest Birds",
      src: "/assets/audio/bird.mp3", // ✅ Correct path for Next.js public assets
    },
    {
      title: "🔥 Campfire Sounds",
      src: "/assets/audio/campfire.mp3",
    },
    {
      title: "🌧️ Rain Sounds",
      src: "/assets/audio/rain.mp3",
    },
    {
      title: "🎧 ASMR Whispering",
      src: "/assets/audio/asmr-whisper.mp3",
    },
    {
      title: "🎵 White Noise",
      src: "/assets/audio/white-noise.mp3",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🎶 Handle play/pause logic
  const togglePlay = (track) => {
    if (currentTrack && currentTrack.src !== track.src) {
      currentTrack.audio.pause();
    }

    if (!currentTrack || currentTrack.src !== track.src) {
      const newAudio = new Audio(track.src);
      setCurrentTrack({ ...track, audio: newAudio });
      newAudio.play();
      setIsPlaying(true);
      newAudio.onended = () => setIsPlaying(false); // Stop when track ends
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
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">🎧 Relax with Calming Sounds</h1>
      <p className="text-gray-600 mb-4">Select a sound to help you relax, focus, or sleep.</p>

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

      <p className="text-center text-gray-500 mt-8">🎵 Let the soothing sounds take you to a peaceful place. 🌿</p>
    </div>
  );
}
