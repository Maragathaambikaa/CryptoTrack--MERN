import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  coinName: { type: String, required: true },
  targetPrice: { type: Number, required: true },
//   email: { type: String, required: true },  // Store user email
//   fcmToken: { type: String } // Firebase token for push notifications
});



export default mongoose.model("Alert", alertSchema);
