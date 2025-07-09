const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load variables from .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.use("/api/suggest", require("./routes/suggest"));
app.use("/api/search", require("./routes/search"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/script", require("./routes/script"));
app.use("/api/contact-info",require("./routes/contactInfo")); 


// Root test route (optional)
app.get("/", (req, res) => {
  res.send("PodPeek backend is running ✅");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
