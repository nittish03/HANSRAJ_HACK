import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { text } = req.body;
    
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
      {
        prompt: `Simplify this medical report for a general audience:\n\n${text}`,
      },
      { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}` } }
    );

    res.json({ simplified: response.data.candidates[0].output });
  } catch (error) {
    res.status(500).json({ error: "Failed to simplify text" });
  }
}
