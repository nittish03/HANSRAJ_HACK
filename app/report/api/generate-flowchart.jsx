import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { text } = req.body;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
      {
        prompt: `Create a structured flowchart representation of this medical information:\n\n${text}`,
      },
      { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}` } }
    );

    const flowchartData = JSON.parse(response.data.candidates[0].output);
    res.json({ flowchart: flowchartData });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate flowchart" });
  }
}
