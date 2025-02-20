import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { hair_type, scalp_type } = await req.json();

    const flaskResponse = await fetch("http://127.0.0.1:5000/generate_routine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hair_type, scalp_type }),
    });

    if (!flaskResponse.ok) {
      throw new Error("Flask API request failed");
    }

    const data = await flaskResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch response from backend" }, { status: 500 });
  }
}
