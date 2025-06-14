const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  const scriptURL = "https://script.google.com/macros/s/AKfycbxax5t_NZCxo2ngwEoK2wTL4M0PVl7bC6IX1bys1kFHaHRjVSIAPOipepbUajYPJuSH/exec"; // your real script URL
  try {
    const result = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const text = await result.text();
    res.send(text);
  } catch (err) {
    res.status(500).send("Failed to submit details at this time. Please try again later.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
