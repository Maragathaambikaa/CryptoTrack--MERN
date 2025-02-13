import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  id: String,
  name: String,
  symbol: String,
  price: Number,
  quantity: Number,
});

export default mongoose.model("Portfolio", PortfolioSchema);
