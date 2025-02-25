"use client";
import React, { useState } from "react";
import axios from "axios";

const doctorsList = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    specialization: "Cardiologist",
    experience: "15 years",
    contact: "+91 9876543210",
    email: "rajesh.sharma@example.com",
  },
  {
    id: 2,
    name: "Dr. Priya Iyer",
    specialization: "Dermatologist",
    experience: "10 years",
    contact: "+91 8765432109",
    email: "priya.iyer@example.com",
  },
  {
    id: 3,
    name: "Dr. Aisha Khan",
    specialization: "Pediatrician",
    experience: "12 years",
    contact: "+91 7654321098",
    email: "aisha.khan@example.com",
  },
];

async function fetchGeminiResponse(query) {
  try {
    const response = await axios.post("/api/doc", { query });
    return response.data.response || "I'm not sure, please try again.";
  } catch (error) {
    console.error( error);
    return "Error: Unable to fetch response.";
  }
}

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const filteredDoctors = doctorsList.filter((doctor) =>
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatResponse("Generating Response...");
    const response = await fetchGeminiResponse(chatInput);
    setChatResponse(` ${response}`);
    setChatInput("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Find a Doctor</h1>


      {/* Gemini AI Chatbot */}
      <div className="mt-10 p-6 bg-gray-100 text-black rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-4">Ask Doctor AI (Medical)</h2>
        <form onSubmit={handleChatSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ask about symptoms, specialists, etc."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">Ask</button>
        </form>
        {chatResponse && <p className="mt-4 p-3 bg-white border rounded-lg text-gray-800">{chatResponse}</p>}
      </div>
            {/* Search Bar */}
            <div className="mb-6">
        <input
          type="text"
          placeholder="Search by specialization (e.g., Cardiologist, Therapist)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      {/* Doctors List */}
      <div className="space-y-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white p-4 shadow rounded-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-black">{doctor.name}</h2>
              <p className="text-gray-700">Specialization: {doctor.specialization}</p>
              <p className="text-gray-700">Experience: {doctor.experience}</p>
              <p className="text-gray-700">Contact: {doctor.contact}</p>
              <div className="mt-4 flex gap-4">
                <a href={`mailto:${doctor.email}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Book Appointment</a>
                <a href={`tel:${doctor.contact}`} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Call Now</a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No doctors found for this specialization.</p>
        )}
      </div>


    </div>
  );
}
