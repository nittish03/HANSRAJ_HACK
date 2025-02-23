import pdfParse from "pdf-parse";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const file = req.body.file;
    const data = await pdfParse(file);
    res.json({ text: data.text });
  } catch (error) {
    res.status(500).json({ error: "Failed to extract text" });
  }
}
