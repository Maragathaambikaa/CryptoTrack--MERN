import Portfolio from "../models/PortfolioModel.js";

// Get all portfolio items
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add new crypto to portfolio
export const addCrypto = async (req, res) => {
  const { id, name, symbol, price, quantity } = req.body;
  try {
    const newCrypto = new Portfolio({ id, name, symbol, price, quantity });
    await newCrypto.save();
    res.status(201).json(newCrypto);
  } catch (error) {
    res.status(500).json({ message: "Failed to add crypto" });
  }
};

// Remove crypto from portfolio
export const removeCrypto = async (req, res) => {
  try {
    await Portfolio.findOneAndDelete({ id: req.params.id });
    res.json({ message: "Crypto removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove crypto" });
  }
};

// Update quantity
export const updateCrypto = async (req, res) => {
  try {
    const { quantity } = req.body;
    await Portfolio.findOneAndUpdate({ id: req.params.id }, { quantity });
    res.json({ message: "Quantity updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update quantity" });
  }
};
