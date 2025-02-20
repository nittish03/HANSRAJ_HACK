import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI("AIzaSyBxyRP3FFAPJ8wEVfWgALSPK5SceMpUJds");

  try {
    const { hair_type, scalp_type } = await req.json();

    if (!hair_type || !scalp_type) {
      return NextResponse.json(
        { error: "Hair type and scalp type are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a hair care expert AI.
      Your role is to provide a personalized hair care routine and product recommendations based on hair type and scalp type.

      Hair types:
      - Straight
      - Wavy
      - Curly
      - Coily

      Scalp types:
      - Oily
      - Dry
      - Normal
      - Sensitive

      Routine should include:
      - Washing frequency
      - Recommended shampoo and conditioner
      - Deep conditioning treatments
      - Additional hair care tips
      - Suggested natural remedies

      User's Hair Type: ${hair_type}
      User's Scalp Type: ${scalp_type}

      Provide a detailed hair care routine and product recommendations.
    `;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    return NextResponse.json({ routine: responseText });
  } catch (error) {
    console.error("Error generating routine:", error);
    return NextResponse.json(
      { error: "Failed to generate routine" },
      { status: 500 }
    );
  }
}
