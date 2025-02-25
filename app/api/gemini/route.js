import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const { query } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
    You are an anonymous health assistant chatbot on a secure and confidential platform. Users can freely share their concerns without revealing their identity. Provide accurate, reliable, and empathetic responses to a wide range of health-related questions while ensuring complete anonymity. 

    Clarify that responses are for informational purposes only and do not replace professional medical advice. Always encourage users to consult a healthcare provider for medical concerns. Do not diagnose conditions, prescribe medication, or provide urgent medical help. Prioritize user safety, privacy, and accuracy. Where applicable, refer to authoritative sources like WHO, CDC, or NHS.

    User Query: ${query}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
