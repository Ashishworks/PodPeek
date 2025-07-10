const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const prompt = `
You are an assistant that helps rephrase questions. Given the original question below, rewrite it in 3 different but equivalent ways, keeping the meaning intact.

Original Question:
"${question}"

Rephrased Versions:
1.
2.
3.
    `.trim();

    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "meta-llama/Llama-3-70b-chat-hf", // use your preferred model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawOutput = response.data.choices[0].message.content;

    const variations = rawOutput
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => /^[1-3]\./.test(line))
      .map((line) => line.replace(/^[1-3]\.\s*/, ""));

    res.json({ variations });
  } catch (err) {
    console.error("Variation error:", err.message);
    res.status(500).json({ error: "Failed to generate variations" });
  }
});

module.exports = router;
