const express = require("express");
const router = express.Router();
const axios = require("axios");

// POST /api/ai
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Missing name or description" });
  }

  const prompt = `
You are a podcast research assistant AI.

Your task is to help the host prepare for an in-depth podcast interview with **${name}** ** ${description}** .

Return ONLY a well-structured Markdown document. Be detailed and go deep into each section. Use bullet points where useful. Avoid general summaries. Include specific examples, names, or dates if known.

Each section should be at least 150–200 words. Add nuance, background, and recent relevance.

Strictly follow this structure:

## 1. Overview
A detailed introduction including profession, known roles, achievements, affiliations, education, and personal style or values.

## 2. Family Background
Names and brief profiles of family members. Any known family influences or controversies.

## 3. Risky Topics to Avoid
Sensitive or uncomfortable subjects to avoid in the podcast — such as personal trauma, politics, legal cases, or cultural criticisms.

## 4. Controversial Moments
Any public backlash, scandals, or events that created tension, backlash, or polarization.

## 5. Most Recent Updates
Highlight what they’ve done in the past month. Travel, interviews, public appearances, projects, etc.

## 6. Current Projects
What are they working on now — businesses, content, startups, missions, hobbies, or advocacy.

DO NOT add any disclaimers, summaries, or headings other than what is listed. Start directly from “## 1. Overview”.
`;

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "deepseek-ai/DeepSeek-V3",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data.choices[0].message.content;
    res.json({ output: aiText });
  } catch (err) {
    console.error("Together.ai error:", err.message);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

module.exports = router;
