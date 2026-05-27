module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, systemPrompt } = req.body;
  if (!messages) return res.status(400).json({ error: 'Missing messages' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const body = { contents, generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } };
    if (systemPrompt) body.systemInstruction = { parts: [{ text: systemPrompt }] };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    const data = await response.json();
    if (!response.ok) {
      const errMsg = data.error?.message || JSON.stringify(data);
      return res.status(502).json({ error: `Gemini API error (${response.status}): ${errMsg}` });
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) return res.status(502).json({ error: 'Gemini returned no text. Response: ' + JSON.stringify(data) });
    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
