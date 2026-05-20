const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

router.post("/", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({
      error: "Question is required",
    });
  }

  try {
    const prompt = `
You are an assistant that helps rephrase podcast interview questions.

Given the original question below, rewrite it in 3 different but equivalent ways while preserving the exact meaning.

Original Question:
"${question}"

Rules:
- Keep the meaning intact
- Make each version natural and conversational
- Avoid repeating the original wording too closely
- Keep them concise

Return ONLY this format:

1. ...
2. ...
3. ...
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const rawOutput = response.text();

    const variations = rawOutput
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^[1-3]\./.test(line))
      .map((line) => line.replace(/^[1-3]\.\s*/, ""));

    res.json({ variations });
  } catch (err) {
    console.error("Gemini variation error:", err);

    res.status(500).json({
      error: "Failed to generate variations",
    });
  }
});

module.exports = router;