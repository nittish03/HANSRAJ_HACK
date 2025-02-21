"use client";
import React, { useState } from "react";

export default function MealPlans() {
  const [month, setMonth] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [foodsToAvoid, setFoodsToAvoid] = useState([]);

  const mealPlans = [
    {
      trimester: "First Trimester (Weeks 1-12)",
      months: [1, 2, 3],
      description:
        "Focus on folate-rich foods, proteins, and healthy fats to support early fetal development.",
      foods: [
        "🥦 Leafy greens (spinach, kale) - High in folate",
        "🥑 Avocados - Packed with healthy fats",
        "🍳 Eggs - Good source of protein and choline",
        "🍊 Citrus fruits - Boosts immune system with vitamin C",
        "🌰 Nuts & seeds - Rich in omega-3 and magnesium",
      ],
      avoid: [
        "🚫 Raw or undercooked seafood (sushi, oysters) - Risk of bacteria & mercury",
        "🚫 High-caffeine drinks - Can affect baby's heart rate",
      ],
    },
    {
      trimester: "Second Trimester (Weeks 13-26)",
      months: [4, 5, 6],
      description:
        "Increase iron and calcium intake to support baby's growth and prevent anemia.",
      foods: [
        "🥩 Lean meats - Great source of iron and protein",
        "🥛 Dairy products (milk, cheese, yogurt) - High in calcium",
        "🐟 Salmon - Rich in omega-3 for brain development",
        "🍠 Sweet potatoes - Packed with beta-carotene for baby's skin and eyes",
        "🥜 Lentils & beans - Excellent plant-based protein",
      ],
      avoid: [
        "🚫 Soft cheeses (brie, feta) - May contain harmful bacteria",
        "🚫 High-mercury fish (shark, swordfish) - Can affect baby's brain development",
      ],
    },
    {
      trimester: "Third Trimester (Weeks 27-40)",
      months: [7, 8, 9],
      description:
        "Boost energy with fiber-rich carbs and prepare for labor with protein and healthy fats.",
      foods: [
        "🍚 Whole grains (brown rice, oats, quinoa) - Long-lasting energy",
        "🍌 Bananas - Helps prevent leg cramps with potassium",
        "🥦 Broccoli - Loaded with vitamin K and calcium",
        "🥩 Lean beef - Increases red blood cell production",
        "🫐 Berries - Rich in antioxidants for immune support",
      ],
      avoid: [
        "🚫 Unpasteurized dairy & juices - Risk of bacterial infections",
        "🚫 Alcohol - Increases risk of birth defects",
      ],
    },
  ];

  const handleSearch = () => {
    const parsedMonth = parseInt(month);
    if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 9) {
      const plan = mealPlans.find((p) => p.months.includes(parsedMonth));
      setSelectedPlan(plan);
      setFoodsToAvoid(plan ? plan.avoid : []);
    } else {
      setSelectedPlan(null);
      setFoodsToAvoid([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🥗 Trimester-Based Meal Plans</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="number"
          placeholder="Enter pregnancy month (1-9)"
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

      {/* Display Trimester Plan */}
      {selectedPlan ? (
        <div>
          {/* Meal Plan */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{selectedPlan.trimester}</h2>
            <p className="text-gray-600 mb-3">{selectedPlan.description}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {selectedPlan.foods.map((food, i) => (
                <li key={i}>{food}</li>
              ))}
            </ul>
          </div>

          {/* Foods to Avoid */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-semibold text-red-600 text-center mb-4">🚫 Foods to Avoid</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {foodsToAvoid.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          Enter a month (1-9) to see the recommended meal plan.
        </p>
      )}
    </div>
  );
}
