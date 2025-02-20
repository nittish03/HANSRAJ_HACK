"use client";
import { useState } from "react";
import axios from "axios";

export default function HairCareRoutine() {
    const [hairType, setHairType] = useState("");
    const [scalpType, setScalpType] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const getRoutine = async () => {
        setLoading(true);
        setResult("");

        try {
            const response = await axios.post("/api/hairCare", {
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
                    <label className="block mb-2 text-gray-300">Enter Your Hair Type:</label>
                    <input 
                        type="text" 
                        value={hairType} 
                        onChange={(e) => setHairType(e.target.value)}
                        placeholder="e.g., Straight, Wavy, Curly, Coily"
                        className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-gray-300">Enter Your Scalp Type:</label>
                    <input 
                        type="text" 
                        value={scalpType} 
                        onChange={(e) => setScalpType(e.target.value)}
                        placeholder="e.g., Oily, Dry, Normal, Sensitive"
                        className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                    />
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
