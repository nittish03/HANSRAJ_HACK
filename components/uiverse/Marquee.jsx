import React from "react";

const TestimonialMarquee = ({
  speed = 20, // Speed in seconds
  reverse = true,
  pauseOnHover = false,
}) => {
  const items = [
    { name: 'Pulkit', username: 'pulkit', message: "I'm at a loss for words. This is amazing. I love it." },
    { name: 'Nittish', username: 'nittish', message: "I've never seen anything like this before. It's amazing. I love it." },
    { name: 'Vrinda', username: 'vrinda', message: "I don't know what to say. I'm speechless. This is amazing." },
    { name: 'Lavanya', username: 'lavanya', message: "This website is a game-changer, love the user experience." },
    { name: 'Geetika', username: 'geetika', message: "I'm blown away by the features and content on this site, amazing work." },
    { name: 'Ravinder', username: 'ravi', message: "The information and resources on this website are invaluable, thanks for creating it." },
  ];

  return (
    <div className="overflow-hidden relative w-full bg-black text-white py-4">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {items.concat(items).map((item, index) => (
          <div
            key={index}
            className="bg-[#111] text-white p-4 rounded-lg mx-2 min-w-[300px] hover:shadow-lg"
          >
            <p className="font-bold">{item.name}</p>
            <p className="text-gray-400">@{item.username}</p>
            <p className="mt-2">{item.message}</p>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .hover-pause:hover { animation-play-state: ${pauseOnHover ? "paused" : "running"}; }
        `}
      </style>
    </div>
  );
};

export default TestimonialMarquee;
