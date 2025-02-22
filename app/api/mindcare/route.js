import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a highly advanced AI assistant named 'MindCare'.
      Your role is to provide support in various aspects of health and well-being, including:
      - *Mental health*: Emotional support, mindfulness, stress-relief exercises, anxiety management.
      - *Medical guidance*: Basic symptom analysis, possible conditions, and medicine recommendations.
      - *Decision-making support*: Helping users with personal, professional, and emotional choices.
      - *General health advice*: Lifestyle improvements, nutrition, physical wellness, and mental well-being.
      - *Emergency assistance*: If the user is in distress, suggest professional help or helpline numbers.

      Your tone is always *empathetic, supportive, and informative*. You ensure users feel heard and cared for.

      User: ${message}
      MindCare:
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
