"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const recommendedVideos = [
  { title: "Understanding Anxiety", videoId: "WWloIAQpMcQ" },
  { title: "The Power of Vulnerability | Brené Brown", videoId: "iCvmsMzlF7o" },
  { title: "How to Make Stress Your Friend | Kelly McGonigal", videoId: "RcGyVTAoXEU" },
  { title: "Overcoming Depression", videoId: "ezVib_giTFo" },
  { title: "Meditation for Mental Health", videoId: "inpok4MKVLM" },
  { title: "How to Cope with Anxiety", videoId: "WWloIAQpMcQ" }
];

export default function MentalHealthPage() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState(recommendedVideos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=6&key=${YOUTUBE_API_KEY}`
      );

      const data = await response.json();
      if (!data.items) {
        throw new Error("Invalid API response");
      }

      setVideos(
        data.items.map((item) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
          thumbnail: item.snippet.thumbnails.medium.url,
        }))
      );
    } catch (err) {
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl text-black mx-auto p-10 space-y-10 bg-gray-50 min-h-screen">
      <motion.h1 
        className="text-5xl font-bold text-center text-blue-700" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        🎥 Mental Health Videos
      </motion.h1>

      <div className="flex justify-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mental health topics..."
          className="p-4 border rounded-lg w-2/3 shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          onClick={fetchVideos}
          className="p-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all"
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>

      {loading && <p className="text-center text-gray-500 text-lg">Loading videos...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div 
            key={index} 
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">{video.title}</h2>
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              frameBorder="0"
              allowFullScreen
              className="mt-4 rounded-lg"
            ></iframe>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
