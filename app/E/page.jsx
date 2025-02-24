"use client";
import React, { useState } from "react";

export default function PregnancyHealthGuide() {
  const [month, setMonth] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [foodsToAvoid, setFoodsToAvoid] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [guidance, setGuidance] = useState(null);
  const [workoutError, setWorkoutError] = useState(null);

  const pregnancyGuidance = {
    1: {
      yoga: ["Cat-Cow Stretch", "Pelvic Tilts"],
      exercises: ["Walking", "Gentle Stretching"],
      tips: ["Stay hydrated", "Listen to your body", "Avoid heavy lifting"],
    },
    2: {
      yoga: ["Butterfly Pose", "Standing Side Stretch"],
      exercises: ["Squats", "Light Strength Training"],
      tips: ["Start practicing deep breathing", "Focus on core stability"],
    },
    3: {
      yoga: ["Seated Forward Bend", "Modified Downward Dog"],
      exercises: ["Pelvic Floor Exercises", "Low-Impact Cardio"],
      tips: ["Maintain good posture", "Avoid sudden movements"],
    },
    4: {
      yoga: ["Warrior Pose II", "Child’s Pose"],
      exercises: ["Light Resistance Training", "Stationary Cycling"],
      tips: ["Eat protein-rich foods", "Stay active but don’t overexert"],
    },
    5: {
      yoga: ["Triangle Pose", "Prenatal Side Stretches"],
      exercises: ["Walking", "Seated Leg Lifts"],
      tips: ["Monitor weight gain", "Stretch daily to prevent stiffness"],
    },
    6: {
      yoga: ["Seated Wide-Leg Forward Bend", "Hip Openers"],
      exercises: ["Swimming", "Prenatal Yoga Flow"],
      tips: ["Practice mindfulness", "Elevate feet to reduce swelling"],
    },
    7: {
      yoga: ["Butterfly Pose", "Pigeon Pose"],
      exercises: ["Wall Sit", "Kegel Exercises"],
      tips: ["Get enough rest", "Reduce stress with relaxation techniques"],
    },
    8: {
      yoga: ["Hip Bridges", "Gentle Backbends"],
      exercises: ["Prenatal Pilates", "Breathing Exercises"],
      tips: ["Prepare for labor with breathing techniques", "Limit prolonged standing"],
    },
    9: {
      yoga: ["Deep Breathing", "Gentle Prenatal Stretching"],
      exercises: ["Walking", "Pelvic Tilts"],
      tips: ["Stay relaxed", "Focus on birth preparation", "Get enough rest"],
    },
  };

  const fetchMealPlan = async (selectedMonth) => {
    setLoading(true);
    setError(null);
    setSelectedPlan(null);
    setFoodsToAvoid([]);
    
    try {
      const response = await fetch("/api/getMealPlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month: selectedMonth }),
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
      if (parsedMonth >= 1) {
        setGuidance(pregnancyGuidance[parsedMonth]);
        setWorkoutError(null);
      } else {
        setGuidance(null);
        setWorkoutError("Please enter a valid month (1-9) for workouts");
      }
    } else {
      setSelectedPlan(null);
      setFoodsToAvoid([]);
      setGuidance(null);
      setError("Please enter a valid month (0-9)");
      setWorkoutError("Please enter a valid month (1-9)");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Pregnancy Health Guide</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="number"
          placeholder="Enter pregnancy month (0-9)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-400 p-2 rounded-lg w-60 text-center text-black bg-white"
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

      {/* Display Meal Plan */}
      {selectedPlan && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">🥗 Meal Plan</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{selectedPlan.trimester}</h3>
            <p className="text-gray-600 mb-3">{selectedPlan.description}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {selectedPlan.foods.map((food, i) => (
                <li key={i}>{food}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
            <h3 className="text-2xl font-semibold text-red-600 text-center mb-4">🚫 Foods to Avoid</h3>
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

      {/* Display Workout Guidance */}
      {workoutError && <p className="text-center text-red-600">{workoutError}</p>}

      {guidance && (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
          <h2 className="text-2xl font-bold text-center mb-4 text-black">🧘‍♀️ Yoga & Exercise Guide</h2>

          <div className="mb-4">
            <h3 className="text-yellow-500 font-semibold">Yoga Poses:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {guidance.yoga.map((pose, i) => (
                <li key={i}>{pose}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-green-500 font-semibold">Exercises:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {guidance.exercises.map((exercise, i) => (
                <li key={i}>{exercise}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-blue-500 font-semibold">Tips:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {guidance.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
