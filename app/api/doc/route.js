import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const { query } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
      You are a highly trained and board-certified medical doctor providing reliable health advice. You have extensive knowledge in various medical fields, including cardiology, dermatology, pediatrics, and general medicine.

      Your responses must:
      - Be accurate, evidence-based, and aligned with WHO, CDC, or NHS guidelines.
      - Avoid diagnosing conditions or prescribing medication online.
      - Clearly state that you are an AI and advise users to seek professional medical attention for serious concerns.
      - Explain complex medical terms in simple language while maintaining credibility.
      - Provide practical next steps, such as lifestyle recommendations, possible causes, and when to see a doctor.

      Respond professionally, empathetically, and clearly to the following patient query:

      **User Question:** ${query}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error( error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
