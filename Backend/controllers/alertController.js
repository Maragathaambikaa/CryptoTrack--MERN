// controllers/alertController.js
import Alert from '../models/AlertModel'; // Import the alert model

/**
 * 🚀 Set a New Price Alert
 */
export const setPriceAlert = async (req, res) => {
    try {
      const { coinId, coinName, targetPrice, email, fcmToken } = req.body;
  
      if (!coinId || !targetPrice) {
        return res.status(400).json({ message: "Coin ID and target price are required" });
      }
  
      const newAlert = new Alert({ coinId, coinName, targetPrice, email, fcmToken });
      const savedAlert = await newAlert.save();
  
      res.status(201).json(savedAlert);  // ✅ Return the saved alert
    } catch (error) {
      res.status(500).json({ message: "Failed to set alert", error });
    }
  };

/**
 * 🛠 Get All Price Alerts
 */
export const getAllPriceAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Error fetching alerts", error });
  }
};

/**
 * ❌ Remove Price Alert
 */
export const removePriceAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAlert = await Alert.findByIdAndDelete(id);

    if (!deletedAlert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.json({ message: "Price alert removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting alert", error });
  }
};

const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/alerts`);
      console.log("Fetched alerts:", response.data); // Debugging
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };
  
