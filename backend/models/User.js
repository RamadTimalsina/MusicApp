const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: [true, 'Name Required!'],
  },
  email: {
    type: String,
    required: [true, 'Email Required!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password Required!'],
    minLength: [8, 'Password must contain at least 8 characters!'],
    select: false, // Password will not be returned in queries by default
  },
  resetPasswordCode: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
