"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";

export default function ChatMindCare() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mindcare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { text: data.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Error fetching response.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center mb-4">🧠 MindCare Chat</h2>
      <div className="h-80 overflow-y-auto bg-gray-700 p-4 border border-gray-600 rounded-lg space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`px-4 py-2 rounded-lg shadow-md text-sm ${msg.sender === "user" ? "bg-blue-500" : "bg-gray-500"}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm text-center animate-pulse">Typing...</p>}
        <div ref={chatEndRef}></div>
      </div>
      <div className="flex mt-4 gap-2">
        <input 
          type="text"
          className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button 
          className="bg-blue-500 p-3 rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50 flex items-center"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Send />}
        </button>
      </div>
    </div>
  );
}