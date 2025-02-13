const axios = require("axios");

const getCryptoNews = async (req, res) => {
  try {
    const apiKey = process.env.CRYPTO_NEWS_API_KEY;
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${apiKey}`
    );
    res.json(response.data); // Send data to frontend
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

module.exports = { getCryptoNews };
