const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: "Missing name or description",
    });
  }

  const prompt = `
Find professional/public contact information for:

${name}
Description: ${description}

Search across public platforms and websites.

Return ONLY in this exact format:

- Email:
- Website:
- LinkedIn:
- Twitter:
- Instagram:
- Any other relevant social or booking links:

If something is unavailable, write "Not Found".

Keep the answer concise and accurate.
`;

  try {
    const result = await model.generateContent(prompt);

    const response = await result.response;
    const contactInfo = response.text();

    res.json({
      output: contactInfo,
    });
  } catch (err) {
    console.error("Gemini contact info error:", err);

    res.status(500).json({
      error: "Failed to fetch contact info",
    });
  }
});

module.exports = router;