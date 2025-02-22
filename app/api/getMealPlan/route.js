import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const { month } = await req.json();

    if (month === undefined || month < 0 || month > 9) {
      return NextResponse.json(
        { error: "Please provide a valid month between 0 and 9." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an expert in pregnancy nutrition. Provide a structured JSON meal plan for month ${month} of pregnancy.
      The response should ONLY contain valid JSON. No extra explanations.
      Structure:
      {
        "trimester": "Trimester name (weeks X-Y)",
        "months": [X, Y],
        "description": "Short nutritional focus description",
        "foods": ["🍎 Apples - Rich in fiber", "🥦 Broccoli - High in folate"],
        "avoid": ["🍷 Alcohol - Harmful to baby", "🥩 Raw meat - Risk of bacteria"]
      }
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // Remove markdown formatting (e.g., ```json ... ```)
    responseText = responseText.replace(/```json|```/g, "").trim();

    try {
      const responseData = JSON.parse(responseText);
      return NextResponse.json({ plan: responseData });
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError, "Response text:", responseText);
      return NextResponse.json(
        { error: "AI response format issue" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
