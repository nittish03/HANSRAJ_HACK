"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

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

const delhiRotaractClubs = [
  {
    id: 1,
    college: "Delhi University",
    clubName: "Rotaract Club of DU",
    instagram: "https://instagram.com/rotaract_du",
    facebook: "https://facebook.com/rotaract_du",
    twitter: "https://twitter.com/rotaract_du",
    linkedin: "https://linkedin.com/in/rotaract_du",
  },
  {
    id: 2,
    college: "Indraprastha University",
    clubName: "Rotaract Club of IPU",
    instagram: "https://instagram.com/rotaract_ipu",
    facebook: "https://facebook.com/rotaract_ipu",
    twitter: "https://twitter.com/rotaract_ipu",
    linkedin: "https://linkedin.com/in/rotaract_ipu",
  },
  {
    id: 3,
    college: "Jamia Millia Islamia",
    clubName: "Rotaract Club of JMI",
    instagram: "https://instagram.com/rotaract_jmi",
    facebook: "https://facebook.com/rotaract_jmi",
    twitter: "https://twitter.com/rotaract_jmi",
    linkedin: "https://linkedin.com/in/rotaract_jmi",
  },
  {
    id: 4,
    college: "Ambedkar University Delhi",
    clubName: "Rotaract Club of AUD",
    instagram: "https://instagram.com/rotaract_aud",
    facebook: "https://facebook.com/rotaract_aud",
    twitter: "https://twitter.com/rotaract_aud",
    linkedin: "https://linkedin.com/in/rotaract_aud",
  },
];



const schemes = [
  {
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    benefits:
      "Provides ₹5 lakh per family for secondary and tertiary hospitalization. Targets over 50 crore citizens.",
    eligibility: "Low-income families as per SECC 2011 data.",
    application: "Apply via PM-JAY website or visit the nearest hospital under the scheme.",
    link: "https://en.wikipedia.org/wiki/Ayushman_Bharat_Yojana",
    documents: [
      "Aadhar Card",
      "Ration Card",
      "Income Certificate",
      "PM-JAY Family ID (if applicable)",
    ],
    steps: [
      "Check eligibility on the PM-JAY website.",
      "Visit a registered hospital or Common Service Center (CSC).",
      "Submit required documents for verification.",
      "Receive the Ayushman Bharat Health Card upon approval.",
      "Use the card for free treatment at empaneled hospitals.",
    ],
    applyLink: "https://pmjay.gov.in",
  },
  {
    name: "Rashtriya Arogya Nidhi (RAN)",
    benefits:
      "Financial aid for patients below the poverty line suffering from major life-threatening diseases.",
    eligibility: "Must be below the poverty line and need treatment in a government super-specialty hospital.",
    application: "Apply through the hospital social welfare officer.",
    link: "https://mohfw.gov.in",
    documents: [
      "Doctor’s referral and medical report",
      "Income proof (Below Poverty Line certificate)",
      "Aadhar Card",
      "Hospital treatment estimate",
    ],
    steps: [
      "Obtain a treatment cost estimate from a government hospital.",
      "Prepare and submit the application through the hospital's social welfare officer.",
      "Documents are reviewed by the Ministry of Health and Family Welfare.",
      "If approved, financial assistance is provided for the treatment.",
    ],
    applyLink: "https://mohfw.gov.in",
  },
  {
    name: "Health Minister’s Discretionary Grant (HMDG)",
    benefits:
      "Financial assistance for patients with an annual family income up to ₹1,25,000 for treatment in govt hospitals.",
    eligibility: "Annual family income ≤ ₹1,25,000. Covers life-threatening diseases.",
    application: "Submit application to the Health Ministry with income proof and medical documents.",
    link: "https://www.myscheme.gov.in/schemes/hmdg",
    documents: [
      "Medical records and doctor's prescription",
      "Income certificate (family income ≤ ₹1,25,000)",
      "Aadhar Card",
      "Hospital estimate for treatment cost",
    ],
    steps: [
      "Download and fill out the application form from the MyScheme portal.",
      "Attach required documents and get them verified by a government hospital.",
      "Submit the application to the Ministry of Health.",
      "Upon approval, funds are allocated to cover treatment expenses.",
    ],
    applyLink: "https://www.myscheme.gov.in/schemes/hmdg",
  },
  {
    name: "Janani Suraksha Yojana (JSY)",
    benefits:
      "Cash assistance to promote institutional deliveries, reducing maternal and neonatal mortality.",
    eligibility: "Pregnant women below the poverty line and from eligible states.",
    application: "Apply at a government hospital or health center.",
    link: "https://en.wikipedia.org/wiki/National_Health_Mission",
    documents: [
      "Pregnancy Registration Card",
      "Aadhar Card",
      "Bank Account Details",
      "BPL Certificate (if applicable)",
    ],
    steps: [
      "Register for JSY at a government health center.",
      "Ensure all antenatal check-ups are completed as required.",
      "Deliver the baby at a government hospital or accredited private facility.",
      "Submit the required documents to claim financial aid.",
      "Cash assistance is directly transferred to the bank account.",
    ],
    applyLink: "https://en.wikipedia.org/wiki/National_Health_Mission",
  },
  {
    name: "National Health Protection Scheme for Senior Citizens",
    benefits:
      "Medical insurance coverage of ₹5 lakh per family for citizens aged 70 and above.",
    eligibility: "Senior citizens (70+ years).",
    application: "Register at a government healthcare center.",
    link: "https://www.reuters.com/world/india/india-raises-free-health-cover-citizens-aged-above-70-years-2024-09-12/",
    documents: [
      "Aadhar Card",
      "Age Proof (Birth Certificate, Voter ID, etc.)",
      "Income Certificate",
      "Medical Records (if applicable)",
    ],
    steps: [
      "Visit a registered government hospital or insurance center.",
      "Submit identity and income verification documents.",
      "Complete biometric verification (if required).",
      "Once approved, receive your health protection card.",
      "Use the card for free treatment in empaneled hospitals.",
    ],
    applyLink: "https://www.reuters.com/world/india/india-raises-free-health-cover-citizens-aged-above-70-years-2024-09-12/",
  },
];



export default function CommunityPage() {
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

      {/* Rotaract Clubs in Delhi Section */}
      <div>
        <h1 className="text-3xl font-bold text-center mb-6">🔗 Rotaract Clubs in Delhi</h1>
        <p className="text-center text-gray-600 mb-6">
          Connect with the Rotaract Clubs of various colleges in Delhi through their social media handles.
        </p>

        <ul className="space-y-6">
          {delhiRotaractClubs.map((club) => (
            <li key={club.id} className="bg-white p-4 shadow rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-black">{club.college}</h2>
              <p className="text-gray-600">{club.clubName}</p>

              {/* Social Media Icons */}
              <div className="mt-3 flex space-x-4">
                <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 text-2xl hover:text-pink-600">
                  <FaInstagram />
                </a>
                <a href={club.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:text-blue-700">
                  <FaFacebook />
                </a>
                <a href={club.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-2xl hover:text-blue-500">
                  <FaTwitter />
                </a>
                <a href={club.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 text-2xl hover:text-blue-900">
                  <FaLinkedin />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>



      <div>
        <h1 className="text-3xl font-bold text-center mb-6 text-white ">💰 Financial Aid & Government Schemes</h1>
        <div className="space-y-6">
          {schemes.map((scheme, index) => (
            <div key={index} className="border p-4 rounded-lg shadow bg-white">
<h3 className="text-xl font-semibold text-black">{scheme.name}</h3>

              <p className="text-gray-700 mt-2"><strong>Benefits:</strong> {scheme.benefits}</p>
              <p className="text-gray-700 mt-2"><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p className="text-gray-700 mt-2"><strong>Application:</strong> {scheme.application}</p>
              
<h3 className="text-lg font-medium mt-2 text-black">Required Documents:</h3>

              <ul className="list-disc ml-6 text-gray-700">
                {scheme.documents.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>

<h3 className="text-lg font-medium mt-2 text-black">Application Process:</h3>

              <ol className="list-decimal ml-6 text-gray-700">
                {scheme.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>

              <Link href={scheme.applyLink} legacyBehavior>
                <a className="text-blue-500 hover:underline mt-2 inline-block" target="_blank" rel="noopener noreferrer">
                  Apply Here
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>




    </div>
  );
}
