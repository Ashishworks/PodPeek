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
  const {
    name,
    description,
    numQuestions = 10,
  } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: "Missing name or description",
    });
  }

  const prompt = `
I’m going to take a podcast interview of ${name}, who is described as:

${description}

Generate exactly ${numQuestions} thoughtful, unique, and engaging podcast interview questions.

The questions should:
- Encourage storytelling
- Feel natural and conversational
- Show deep research awareness
- Avoid generic podcast clichés
- Explore experiences, failures, mindset, decisions, and insights
- Include a mix of personal, professional, and reflective questions

Return ONLY the numbered list of questions in markdown.

Do not add intros, summaries, explanations, or headings.
`;

  try {
    const result = await model.generateContent(prompt);

    const response = await result.response;

    const script = response.text();

    res.json({
      output: script,
    });
  } catch (err) {
    console.error("Gemini error:", err);

    res.status(500).json({
      error: "Failed to generate podcast questions",
    });
  }
});

module.exports = router;