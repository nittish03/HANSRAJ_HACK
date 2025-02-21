"use client"

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MentalHealthPage() {
  const [query, setQuery] = useState("mental health");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://youtube-search-and-download.p.rapidapi.com/search?query=${encodeURIComponent(query)}&type=video&hl=en&gl=US`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "YOUR_API_KEY", 
            "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();
      if (!data || !data.contents) {
        throw new Error("Invalid API response");
      }

      setVideos(
        data.contents
          .filter((item) => item.video)
          .map((item) => ({
            title: item.video.title,
            videoId: item.video.videoId,
          }))
      );
    } catch (err) {
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <motion.h1 
        className="text-4xl font-bold text-center text-blue-600" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        🎥 Mental Health Videos
      </motion.h1>

      <div className="flex justify-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mental health topics..."
          className="p-3 border rounded-lg w-2/3 shadow-md"
        />
        <motion.button
          onClick={fetchVideos}
          className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading videos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div 
            key={index} 
            className="p-4 bg-gray-100 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              frameBorder="0"
              allowFullScreen
              className="mt-2 rounded-lg"
            ></iframe>
          </motion.div>
        ))}
      </div>

      <motion.h1 
        className="text-4xl font-bold text-center mt-10 text-green-600" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        🎤 Mental Health Interviews
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviewVideos.map((video, index) => (
          <motion.div 
            key={index} 
            className="p-4 bg-gray-100 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-lg font-semibold text-black">{video.title}</h2>
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              frameBorder="0"
              allowFullScreen
              className="mt-2 rounded-lg"
            ></iframe>
          </motion.div>
        ))}
      </div>

      <motion.h1 
        className="text-4xl font-bold text-center mt-10 text-purple-600" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        📰 Mental Health Blog
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div 
            key={index} 
            className="p-4 bg-gray-100 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-lg font-semibold text-black">{article.title}</h2>
            <p className="mt-2 text-gray-700">{article.summary}</p>
            <Link
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const interviewVideos = [
  { title: "The Power of Vulnerability | Brené Brown", videoId: "iCvmsMzlF7o" },
  { title: "How to Make Stress Your Friend | Kelly McGonigal", videoId: "RcGyVTAoXEU" },
  { title: "How to Cope with Anxiety", videoId: "WWloIAQpMcQ" },
  { title: "Depression, the Secret We Share | Andrew Solomon", videoId: "ezVib_giTFo" },
];

const articles = [
  {
    title: "Managing Anxiety: Tips & Techniques",
    summary: "Explore effective strategies to manage anxiety in daily life.",
    link: "https://www.thetimes.co.uk/article/anxiety-expert-addiction-advice-tips-jf95kdmj9",
  },
  {
    title: "Self-Care for Mental Well-being",
    summary: "Discover self-care practices to enhance your mental health.",
    link: "https://www.helpguide.org/mental-health/wellbeing/self-care-tips-to-prioritize-your-mental-health",
  },
  {
    title: "Personal Story: Overcoming Life's Crises",
    summary: "Read about one individual's journey through personal challenges.",
    link: "https://www.theguardian.com/society/2025/feb/16/my-whole-life-has-been-one-dramatic-crisis-after-another",
  },
  {
    title: "The Benefits of Junk Journaling",
    summary: "Learn how junk journaling can be a therapeutic self-care activity.",
    link: "https://www.verywellmind.com/i-tried-junk-journaling-for-a-month-11679873",
  },
  {
    title: "Caring for Your Mental Health",
    summary: "Comprehensive guide on maintaining mental health through self-care.",
    link: "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
  },
  {
    title: "How to Cope with Stress in a Healthy Way",
    summary: "Learn scientifically-backed strategies to reduce stress effectively.",
    link: "https://www.apa.org/topics/stress/healthy-strategies",
  },
];