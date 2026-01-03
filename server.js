const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔁 PUT YOUR NGROK URL HERE (NO /generate at end)
const COLAB_API = "https://unconsuming-monte-nippy.ngrok-free.dev";

app.post("/generate-image", async (req, res) => {
  try {
    const response = await axios.post(
      `${COLAB_API}/generate`,
      { prompt: req.body.prompt },
      { responseType: "arraybuffer" }
    );

    const base64Image = Buffer.from(response.data).toString("base64");

    res.json({
      success: true,
      image_base64: base64Image
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("SD Proxy is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
