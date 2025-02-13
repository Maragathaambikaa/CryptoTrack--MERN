import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Your backend URL

// Fetch crypto data from the backend
export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/crypto`);
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};

// Add a cryptocurrency to the portfolio
export const addCryptoToPortfolio = async (crypto) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/portfolio`, crypto);
    return response.data;
  } catch (error) {
    console.error("Error adding crypto to portfolio:", error);
  }
};
