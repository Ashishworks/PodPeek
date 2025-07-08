const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/suggest?query=aman
router.get("/", async (req, res) => {
  const query = req.query.query;

  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.post(
      "https://google.serper.dev/search",
      { q: query },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const results = response.data.organic;

    const seen = new Set();
    const blacklist = ["pinterest", "reddit", "x.com", "twitter", "facebook"];
    const suggestions = [];

    for (let item of results) {
      const domain = new URL(item.link).hostname;
      const title = item.title.trim().toLowerCase();

      if (blacklist.some(b => domain.includes(b))) continue;
      if (seen.has(title)) continue;

      seen.add(title);
      suggestions.push({
        name: item.title,
        description: item.snippet,
        url: item.link,
      });

      if (suggestions.length === 7) break;
    }

    res.json(suggestions);
  } catch (error) {
    console.error("Serper API error:", error.message);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

module.exports = router;
