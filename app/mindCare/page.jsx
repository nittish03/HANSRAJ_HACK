"use client";
import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

const MindCareChat = () => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I help?", sender: "ai" }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/mindCare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setIsLoading(false);
      return data.response || "I'm here to help, but I couldn't understand that.";
    } catch (error) {
      setIsLoading(false);
      return "I'm having trouble processing your request.";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiResponseText = await generateResponse(input);
    const aiMessage = { text: aiResponseText, sender: "ai" };
    
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-[50vw] bg-gray-850 text-white rounded-2xl shadow-2xl flex flex-col h-[600px] border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-blue-600 text-center font-bold flex items-center justify-center border-b border-gray-700 shadow-lg">
          <span className="mr-2 text-2xl">🧠</span> MindCare Chat
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-[75%] text-sm shadow-md ${
                msg.sender === "user" ? "bg-blue-500 ml-auto text-white" : "bg-gray-700 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="p-3 bg-gray-700 rounded-xl flex items-center shadow-md">
              <Loader2 className="mr-2 animate-spin" size={20} /> Generating response...
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="p-4 border-t border-gray-700 flex bg-gray-800 shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask MindCare anything..."
            className="flex-grow p-3 bg-gray-700 text-white rounded-l-full border-none focus:outline-none placeholder-gray-400"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-5 py-3 rounded-r-full shadow-lg"
            disabled={isLoading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindCareChat;