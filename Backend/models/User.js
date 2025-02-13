const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  interests: [String],  // Array of interests
});

const User = mongoose.model('User', userSchema);

module.exports = User;
