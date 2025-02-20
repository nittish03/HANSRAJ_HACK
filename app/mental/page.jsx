"use client"
import { useState } from "react";
import Link from "next/link";

export default function MentalHealthPage() {
  const [query, setQuery] = useState("mental health");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🎥 Function to Fetch Videos from RapidAPI (YouTube)
  const fetchVideos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://youtube-search-and-download.p.rapidapi.com/search?query=${encodeURIComponent(query)}&type=video&hl=en&gl=US`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "07e5d46e34mshe5b2df679e69cddp174576jsndbc5d50b1f49", // 🔴 Replace with your API Key
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
    <div className="max-w-5xl mx-auto p-6">
      {/* 🎥 YouTube Video Search */}
      <h1 className="text-3xl font-bold text-center mb-6">🎥 Mental Health Videos</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mental health topics..."
          className="p-2 border rounded-lg w-1/2"
        />
        <button
          onClick={fetchVideos}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading videos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              frameBorder="0"
              allowFullScreen
              className="mt-2"
            ></iframe>
          </div>
        ))}
      </div>

      {/* 🎤 Static Mental Health Interviews */}
      <h1 className="text-3xl font-bold text-center mt-10 mb-6">🎤 Mental Health Interviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviewVideos.map((video, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-black">{video.title}</h2>
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              frameBorder="0"
              allowFullScreen
              className="mt-2"
            ></iframe>
          </div>
        ))}
      </div>

      {/* 📰 Blog Section */}
      <h1 className="text-3xl font-bold text-center mt-10 mb-6">📰 Mental Health Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-black">{article.title}</h2>
            <p className="mt-2 text-gray-700">{article.summary}</p>
            <Link
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎤 Static Interview Videos
const interviewVideos = [
  {
    title: "The Power of Vulnerability | Brené Brown | TEDxHouston",
    videoId: "iCvmsMzlF7o",
  },
  {
    title: "How to Make Stress Your Friend | Kelly McGonigal | TED",
    videoId: "RcGyVTAoXEU",
  },
  {
    title: "How to Cope with Anxiety | A Psychologist's Guide",
    videoId: "WWloIAQpMcQ",
  },
  {
    title: "Depression, the Secret We Share | Andrew Solomon | TED",
    videoId: "ezVib_giTFo",
  },
];

// 📰 Blog Articles
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
