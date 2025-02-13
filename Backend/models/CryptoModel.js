const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  interests: [String],  // List of interests (e.g., 'cryptocurrency', 'stocks')
});

const User = mongoose.model('User', userSchema);
module.exports = User;

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    interest: { type: String, required: true },
    sentTo: [String],  // List of users who were notified
    createdAt: { type: Date, default: Date.now },
  });
  
  const Notification = mongoose.model('Notification', notificationSchema);
  module.exports = Notification;