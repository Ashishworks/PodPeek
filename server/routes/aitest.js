const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

// Helper function
const generateFromPrompt = async (prompt) => {
  const result = await model.generateContent(prompt);

  const response = await result.response;

  return response.text();
};

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: "Missing name or description",
    });
  }

  // --- Prompt 1 ---
  const prompt1 = `
You are a podcast research assistant AI.

Your task is to help the host prepare for an in-depth podcast interview with ${name}, described as: ${description}.

Return ONLY a well-structured Markdown document.

Be detailed and go deep into each section.
Use bullet points where useful.
Avoid generic summaries.
Include specific examples, names, or dates if known.

Each section should be at least 150–200 words.

Strictly follow this structure:

## 1. Overview
A detailed introduction including profession, known roles, achievements, affiliations, education, and personal style or values.

## 2. Family Background
Names and brief profiles of family members. Any known family influences or controversies.

## 3. Risky Topics to Avoid
Sensitive or uncomfortable subjects to avoid in the podcast — such as personal trauma, politics, legal cases, or cultural criticisms.

## 4. Controversial Moments
Any public backlash, scandals, or events that created tension, backlash, or polarization.

DO NOT add disclaimers or unrelated headings.
Start directly from "## 1. Overview".
`;

  // --- Prompt 2 ---
  const prompt2 = `
You are a podcast research assistant AI.

Your task is to help the host prepare for an in-depth podcast interview with ${name}, described as: ${description}.

Each section should be at least 150–200 words.

Strictly follow this structure:

## 5. Most Recent Updates
Highlight what they’ve done in the past 3 months:
- interviews
- appearances
- projects
- launches
- social activity
- travel
- announcements

If recent info is unavailable, use latest known 2025 information.

## 6. Current Projects
What are they working on now:
- businesses
- startups
- podcasts
- content
- advocacy
- investments
- missions
- hobbies

DO NOT repeat previous sections.
DO NOT add disclaimers.
Start directly from "## 5. Most Recent Updates".
`;

  try {
    const [part1, part2] = await Promise.all([
      generateFromPrompt(prompt1),
      generateFromPrompt(prompt2),
    ]);

    const combinedOutput = `${part1}\n\n${part2}`;

    res.json({
      output: combinedOutput,
    });
  } catch (err) {
    console.error("Gemini error:", err);

    res.status(500).json({
      error: "Failed to generate AI response",
    });
  }
});

module.exports = router;