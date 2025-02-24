"use client";
import React from "react";

const supportGroups = [
  { id: 1, name: "Pregnancy Support", link: "https://t.me/pregnancy_group" },
  { id: 2, name: "Mental Health Support", link: "https://t.me/mentalhealth_group" },
  { id: 3, name: "Chronic Illness Support", link: "https://t.me/chronicillness_group" },
];

const hardcodedNGOs = [
  {
    id: 1,
    name: "Helping Hands NGO",
    address: "123 Main Street, New Delhi, India",
    phone: "+91 9876543210",
    lat: 28.6139,
    lng: 77.2090,
  },
  {
    id: 2,
    name: "Care Foundation",
    address: "45 Gandhi Marg, Mumbai, India",
    phone: "+91 9988776655",
    lat: 19.0760,
    lng: 72.8777,
  },
  {
    id: 3,
    name: "Wellness Trust",
    address: "78 Park Road, Bangalore, India",
    phone: "+91 9123456789",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: 4,
    name: "Hope & Care Initiative",
    address: "201 Charity Lane, Chennai, India",
    phone: "+91 9012345678",
    lat: 13.0827,
    lng: 80.2707,
  },
];

export default function Community() {
  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen space-y-10">
      {/* Peer Support Groups Section */}
      <div>
        <h1 className="text-3xl font-bold text-center mb-6">🤝 Join a Peer Support Group</h1>
        <ul className="space-y-4">
          {supportGroups.map((group) => (
            <li key={group.id} className="bg-white p-4 shadow rounded-lg flex justify-between items-center border border-gray-200">
              <span className="text-lg text-black font-semibold">{group.name}</span>
              <a
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Join
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Nearby NGOs Section */}
      <div>
        <h1 className="text-3xl font-bold text-center mb-6">🌍 Find Nearby NGOs</h1>
        <p className="text-center text-gray-600 mb-6">Below are some NGOs near your location.</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hardcodedNGOs.map((ngo) => (
            <li key={ngo.id} className="bg-white p-4 shadow rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-black">{ngo.name}</h2>
              <p className="text-gray-600">{ngo.address}</p>
              <p className="text-gray-600">📞 {ngo.phone}</p>
              <div className="mt-3 flex space-x-2">
                <a
                  href={`tel:${ngo.phone}`}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                >
                  Call Now
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${ngo.lat},${ngo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  View on Map
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
