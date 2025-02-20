"use client";
import { useState } from "react";
import axios from "axios";

export default function HairCareRoutine() {
    const [hairType, setHairType] = useState("Straight");
    const [scalpType, setScalpType] = useState("Oily");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const getRoutine = async () => {
        setLoading(true);
        setResult("");

        try {
            const response = await axios.post("/api/generateRoutine", {
                hair_type: hairType,
                scalp_type: scalpType,
            });

            setResult(formatRoutine(response.data.routine));
        } catch (error) {
            console.error("Error:", error);
            setResult('<p class="text-red-500">❌ Something went wrong. Please try again.</p>');
        }

        setLoading(false);
    };

    const formatRoutine = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold for headings
            .replace(/\*(.*?)\*/g, "<li>$1</li>") // Bullet points
            .replace(/\n/g, "<br>"); // Line breaks
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-[80%] text-center">
                <h1 className="text-2xl font-bold mb-4">Personalized Hair Care Routine</h1>

                <div className="mb-4">
                    <label className="block mb-2 text-gray-300">Select Your Hair Type:</label>
                    <select 
                        value={hairType} 
                        onChange={(e) => setHairType(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                    >
                        <option value="Straight">Straight</option>
                        <option value="Wavy">Wavy</option>
                        <option value="Curly">Curly</option>
                        <option value="Coily">Coily</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-gray-300">Select Your Scalp Type:</label>
                    <select 
                        value={scalpType} 
                        onChange={(e) => setScalpType(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                    >
                        <option value="Oily">Oily</option>
                        <option value="Dry">Dry</option>
                        <option value="Normal">Normal</option>
                        <option value="Sensitive">Sensitive</option>
                    </select>
                </div>

                <button 
                    onClick={getRoutine} 
                    disabled={loading} 
                    className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold transition"
                >
                    {loading ? "Generating..." : "Get Hair Care Routine"}
                </button>

                {loading && (
                    <div className="mt-4 flex justify-center">
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}

                <div 
                    dangerouslySetInnerHTML={{ __html: result }} 
                    className="mt-4 p-4 bg-gray-700 rounded-md text-left"
                ></div>
            </div>
        </div>
    );
}
