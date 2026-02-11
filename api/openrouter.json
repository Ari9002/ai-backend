// Datei: api/openrouter.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST erlaubt" });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt fehlt" });

  // Testantwort
  res.status(200).json({ answer: "Backend funktioniert ✅" });
}
