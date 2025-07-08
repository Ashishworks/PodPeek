const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Missing name or description" });
  }

  const prompt = `
I’m going to take a podcast interview of **${name}**, who is ${description}.
Please generate 20 thoughtful, unique, and engaging podcast questions that:
- Encourage storytelling
- Show research-based awareness
- Are not generic

Return only the list of questions in markdown bullet points, no intro or summary.
`;

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "deepseek-ai/DeepSeek-V3",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const script = response.data.choices[0].message.content;
    res.json({ output: script });
  } catch (err) {
    console.error("Together.ai error:", err.message);
    res.status(500).json({ error: "Failed to generate podcast script" });
  }
});

module.exports = router;
