const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// ✅ Allow only your GitHub Pages site
const allowedOrigins = ["https://charlielowden34.github.io"]; // Replace USERNAME with your GitHub username

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  }
}));

app.use(express.json());

app.post("/submit", async (req, res) => {
  const scriptURL = "https://script.google.com/macros/s/AKfycbxax5t_NZCxo2ngwEoK2wTL4M0PVl7bC6IX1bys1kFHaHRjVSIAPOipepbUajYPJuSH/exec"; // Replace with actual URL
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to submit details at this time. Please try again later.");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
