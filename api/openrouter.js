export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST erlaubt" });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt fehlt" });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.sk-or-v1-5c5cd000096f0365c1195a5f7688c02a32dfd9277f864fb16fc625d-f456a1ece}` // sicher über ENV
      },
      body: JSON.stringify({
        model: "xiaomi/mimo-v2-flash:free", // kostenloses Modell
        messages: [
          { role: "system", content: "Du bist ein hilfreicher Assistent." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ answer: data.choices?.[0]?.message?.content || "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler bei OpenRouter Anfrage" });
  }
}
