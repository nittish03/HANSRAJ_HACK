"use client";
import { useState } from "react";

export default function ChatMindCare() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="max-w-lg mx-auto p-4 bg-black rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">MindCare Chat</h2>
      <div className="h-64 overflow-y-auto bg-white p-3 border rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-1 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-black" : "bg-gray-300 text-black"}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-black text-sm text-center mt-2">Typing...</p>}
      </div>
      <div className="flex mt-3">
        <input 
          type="text"
          className="flex-1 p-2 text-black border rounded-l"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button 
          className="bg-blue-500 text-black px-4 py-2 rounded-r disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
