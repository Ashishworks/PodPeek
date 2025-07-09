const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Missing name or description" });
  }

  const prompt = `
 **${name}** who is described as **${description}**.
 search all the platforms and whole internet deeply to find info stated below

Return only relevant contact info in this format:

- Email:
- Website:
- LinkedIn:
- Twitter:
- Instagram:
- Any other relevant social or booking links:

If any of the above are not available, mention "Not Found". Keep it precise.
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

    const contactInfo = response.data.choices[0].message.content;
    res.json({ output: contactInfo });
  } catch (err) {
    console.error("Together.ai contact info error:", err.message);
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
});

module.exports = router;
