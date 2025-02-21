"use client";
import React from "react";

export default function EducationalContent() {
  const videos = [
    {
      title: "Here Comes Baby - Postpartum Recovery",
      embedUrl: "https://www.youtube.com/embed/cYWGzXLZFAk",
      description: "This video by Ottawa Public Health and the Monarch Centre discusses physical and emotional changes after childbirth.",
    },
    {
      title: "Postpartum - Breastfeeding and Sleeping",
      embedUrl: "https://www.youtube.com/embed/ZRlTm2lDiG0",
      description: "Insights into breastfeeding and managing sleep during the postpartum period.",
    },
    {
      title: "Sleep Support 101 | Happy Mum Happy Baby: Parenting SOS",
      embedUrl: "https://www.youtube.com/embed/-5YTFZfvgYU",
      description: "Eve & Gem discuss sleep training, its reputation, and the impact of sleep deprivation on mental health.",
    },
    {
      title: "Exercise in Pregnancy, Sleep Training and Relationship Challenges",
      embedUrl: "https://www.youtube.com/embed/h1zThs3FJQE",
      description: "The Doctors Bjorkman share their experiences on pregnancy, sleep training, and relationship dynamics post-baby.",
    },
  ];

  const blogs = [
    {
      title: "Pregnancy Week-by-Week Guide",
      description: "Detailed insights into each stage of your pregnancy journey.",
      url: "https://www.whattoexpect.com/pregnancy/week-by-week/",
    },
    {
      title: "Nutrition Tips for Expecting Mothers",
      description: "Essential dietary advice to support you and your baby's health.",
      url: "https://www.thebump.com/a/pregnancy-nutrition-guide",
    },
    {
      title: "Safe Exercise During Pregnancy",
      description: "Guidelines and recommendations for staying active safely.",
      url: "https://www.babycenter.com/pregnancy/fitness/safe-exercise-during-pregnancy_7864",
    },
    {
      title: "Managing Stress and Anxiety While Pregnant",
      description: "Effective strategies to maintain mental well-being during pregnancy.",
      url: "https://www.tommys.org/pregnancy-information/im-pregnant/mental-wellbeing/stress-and-anxiety-during-pregnancy",
    },
    {
      title: "Sleep Solutions for Pregnant Women",
      description: "Tips to achieve restful sleep throughout your pregnancy.",
      url: "https://www.sleepfoundation.org/pregnancy",
    },
    {
      title: "Preparing for Your Baby's Arrival",
      description: "A comprehensive checklist to get ready for your newborn.",
      url: "https://www.pregnancy.com.au/preparing-for-your-babys-arrival/",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Educational Blogs & Videos</h1>

      {/* Video Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">🎥 Informative Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
              <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">{video.title}</h3>
              <p className="text-gray-600 text-center mb-2">{video.description}</p>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-48 rounded-lg"
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blogs Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">📝 Pregnancy Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{blog.title}</h3>
              <p className="text-gray-600 mb-2">{blog.description}</p>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
