import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const { query } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
      You are a specialized AI chatbot designed to provide accurate, concise, and factual information on all topics, 
      with a particular focus on pollution. Respond to user queries clearly and effectively, 
      tailoring your answers to the context. For pollution-related questions, address its causes, types, 
      impacts, and mitigation strategies. Ensure responses are brief, to the point, and easy to understand.

      User Query: ${query}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}