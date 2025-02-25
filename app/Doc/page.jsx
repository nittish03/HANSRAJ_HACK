"use client";
import React, { useState } from "react";

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
  {
    id: 4,
    name: "Dr. Arjun Verma",
    specialization: "Orthopedic Surgeon",
    experience: "14 years",
    contact: "+91 6543210987",
    email: "arjun.verma@example.com",
  },
  {
    id: 5,
    name: "Dr. Neha Mehta",
    specialization: "Mental Health Specialist",
    experience: "9 years",
    contact: "+91 5432109876",
    email: "neha.mehta@example.com",
  },
  {
    id: 6,
    name: "Dr. Vikram Joshi",
    specialization: "Therapist",
    experience: "7 years",
    contact: "+91 4321098765",
    email: "vikram.joshi@example.com",
  },
  {
    id: 7,
    name: "Dr. Ananya Das",
    specialization: "Therapist",
    experience: "8 years",
    contact: "+91 3210987654",
    email: "ananya.das@example.com",
  },
  {
    id: 8,
    name: "Dr. Sunita Rao",
    specialization: "Gynecologist",
    experience: "16 years",
    contact: "+91 2109876543",
    email: "sunita.rao@example.com",
  },
  {
    id: 9,
    name: "Dr. Kavita Patel",
    specialization: "Gynecologist",
    experience: "12 years",
    contact: "+91 1098765432",
    email: "kavita.patel@example.com",
  },
  {
    id: 10,
    name: "Dr. Manish Gupta",
    specialization: "General Physician",
    experience: "11 years",
    contact: "+91 9988776655",
    email: "manish.gupta@example.com",
  },
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");

  // Filter doctors based on search input
  const filteredDoctors = doctorsList.filter((doctor) =>
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Find a Doctor</h1>

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
            <div
              key={doctor.id}
              className="bg-white p-4 shadow rounded-lg border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-black">{doctor.name}</h2>
              <p className="text-gray-700">Specialization: {doctor.specialization}</p>
              <p className="text-gray-700">Experience: {doctor.experience}</p>
              <p className="text-gray-700">Contact: {doctor.contact}</p>

              {/* Buttons */}
              <div className="mt-4 flex gap-4">
                <a
                  href={`mailto:${doctor.email}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Book Appointment
                </a>
                <a
                  href={`tel:${doctor.contact}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Call Now
                </a>
                <a
    href={`#`} // Replace # with your chat URL or function
    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
  >
    Chat
  </a>
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
