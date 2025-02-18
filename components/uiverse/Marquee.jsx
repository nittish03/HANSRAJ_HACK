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
    <div className="overflow-hidden relative w-full bg-gradient-to-r from-gray-900 to-black text-white py-8">
      <div className="flex whitespace-nowrap items-center" style={{ animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}` }}>
        {items.concat(items).concat(items).map((item, index) => (
          <div
            key={index}
            className="bg-[#111] text-white p-6 rounded-lg mx-4 min-w-[220px] h-[220px] shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center flex-wrap mb-2">
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">👤</span>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-400 text-sm">@{item.username}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed flex justify-center items-center flex-wrap">{item.message}</p>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-33.33%); }
          }
          .hover-pause:hover { animation-play-state: ${pauseOnHover ? "paused" : "running"}; }
        `}
      </style>
    </div>
  );
};

export default TestimonialMarquee;
