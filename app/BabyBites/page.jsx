"use client";
import React, { useState } from "react";

export default function MealPlans() {
  const [month, setMonth] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [foodsToAvoid, setFoodsToAvoid] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealPlan = async (selectedMonth) => {
    setLoading(true);
    setError(null);
    setSelectedPlan(null);
    setFoodsToAvoid([]);
    
    try {
      const response = await fetch("/api/getMealPlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month: selectedMonth })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch meal plan");
      }

      const data = await response.json();
      setSelectedPlan(data.plan);
      setFoodsToAvoid(data.plan.avoid || []);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleSearch = () => {
    const parsedMonth = parseInt(month);
    if (!isNaN(parsedMonth) && parsedMonth >= 0 && parsedMonth <= 9) {
      fetchMealPlan(parsedMonth);
    } else {
      setSelectedPlan(null);
      setFoodsToAvoid([]);
      setError("Please enter a valid month (0-9)");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🥗 Pregnancy-Based Meal Plans</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="number"
          placeholder="Enter pregnancy month (0-9)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-400 p-2 rounded-lg w-60 text-center text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Fetching meal plan...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Display Trimester Plan */}
      {selectedPlan && (
        <div>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{selectedPlan.trimester}</h2>
            <p className="text-gray-600 mb-3">{selectedPlan.description}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {selectedPlan.foods.map((food, i) => (
                <li key={i}>{food}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-semibold text-red-600 text-center mb-4">🚫 Foods to Avoid</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {foodsToAvoid.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!loading && !selectedPlan && !error && (
        <p className="text-center text-gray-600 mt-4">Enter a month (0-9) to see the recommended meal plan.</p>
      )}
    </div>
  );
}
