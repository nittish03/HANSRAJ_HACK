import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const { query } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
      You are a trusted health assistant chatbot for a health and wellness website. Provide accurate, reliable, and empathetic responses to a wide range of health-related questions. Clarify that responses are for informational purposes only and do not replace professional medical advice. Always encourage users to consult a healthcare provider for medical concerns. Do not diagnose conditions, prescribe medication, or provide urgent medical help. Prioritize user safety and accuracy. Refer to authoritative sources like WHO, CDC, or NHS where applicable.

      User Query: ${query}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
