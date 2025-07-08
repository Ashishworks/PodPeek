const express = require("express");
const router = express.Router();
const { generateSummaryWithTogether } = require("../../client/src/services/togetherService");

router.post("/", async (req, res) => {
  const { name, description, snippets } = req.body;

  if (!name || !snippets || !Array.isArray(snippets)) {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  try {
    const result = await generateSummaryWithTogether(snippets, name, description);
    res.json({ result });
  } catch (error) {
    console.error("Together.ai Error:", error.message);
    res.status(500).json({ error: "Failed to generate podcast summary" });
  }
});

module.exports = router;
