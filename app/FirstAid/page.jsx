"use client";
import React from "react";

const firstAidTopics = [
  {
    id: 1,
    title: "Bleeding and Wounds",
    description: "Stopping bleeding quickly is crucial to prevent shock and excessive blood loss.",
    steps: [
      "Apply direct pressure to the wound using a clean cloth or bandage.",
      "Keep the wound elevated if possible.",
      "If bleeding does not stop, apply more pressure and seek medical help.",
      "Avoid removing objects stuck in the wound; let medical professionals handle it.",
    ],
    videoUrl: "https://www.youtube.com/embed/NoOW3Ca0vPM", // ✅ Embeddable video
  },
  {
    id: 2,
    title: "Choking",
    description: "Choking occurs when an object blocks the airway, preventing breathing.",
    steps: [
      "Encourage the person to cough if they can.",
      "If they cannot breathe, perform the Heimlich maneuver: Stand behind them, wrap your arms around their waist, and give quick, upward thrusts below their ribcage.",
      "Repeat until the object is dislodged or help arrives.",
    ],
    videoUrl: "https://www.youtube.com/embed/5k8nDlfaA9E", // ✅ Embeddable video
  },
  {
    id: 3,
    title: "Burns",
    description: "Immediate first aid can prevent further skin damage from burns.",
    steps: [
      "Cool the burn under running water for at least 10 minutes.",
      "Do not apply ice, butter, or toothpaste to the burn.",
      "Cover the burn loosely with a clean, non-stick bandage.",
      "Seek medical attention for severe burns or if the burn is large.",
    ],
    videoUrl: "https://www.youtube.com/embed/B10sth4zjuI", // ✅ Embeddable video
  },
  {
    id: 4,
    title: "Fractures and Broken Bones",
    description: "A broken bone requires stabilization to prevent further damage.",
    steps: [
      "Keep the injured limb still and immobilized using a splint or support.",
      "Apply a cold pack to reduce swelling.",
      "Do not try to realign the bone yourself.",
      "Seek medical attention immediately.",
    ],
    videoUrl: "https://www.youtube.com/embed/lmLpL2r3a24", // ✅ Embeddable video
  },
  {
    id: 5,
    title: "Snake Bite",
    description: "Snake bites can be life-threatening and require immediate medical attention.",
    steps: [
      "Keep the person calm and still to slow venom spread.",
      "Position the affected limb below heart level.",
      "Remove any tight clothing or jewelry near the bite site.",
      "Do not cut, suck, or apply ice to the wound.",
      "Seek emergency medical help immediately.",
    ],
    videoUrl: "https://www.youtube.com/embed/4npPTn5yB5k", // ✅ Embeddable video
  },
];

export default function FirstAidPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen space-y-10">
      <h1 className="text-4xl font-bold text-center text-red-600">🚑 First Aid Guide</h1>
      <p className="text-center text-gray-600">
        Learn essential first aid techniques to help in emergency situations.
      </p>

      {/* First Aid Topics Section */}
      <div className="space-y-6">
        {firstAidTopics.map((topic) => (
          <div key={topic.id} className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-black">{topic.title}</h2>
            <p className="text-gray-700 mt-2">{topic.description}</p>

            <h3 className="text-lg font-medium mt-2 text-black">Steps:</h3>
            <ul className="list-decimal ml-6 text-gray-700">
              {topic.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>

            {/* Embedded YouTube Video */}
            <div className="mt-4">
              <iframe
                width="100%"
                height="315"
                src={topic.videoUrl}
                title={topic.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
