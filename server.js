const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());


const COLAB_URL = "https://unconsuming-monte-nippy.ngrok-free.dev";

app.post("/generate-image", async (req, res) => {
  try {
    const response = await axios.post(
      `${COLAB_URL}/generate`,
      { prompt: req.body.prompt },
      { responseType: "arraybuffer" }
    );

    const base64Image = Buffer.from(response.data).toString("base64");

    res.json({
      success: true,
      image: `data:image/png;base64,${base64Image}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("SD Proxy is running 🚀");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
