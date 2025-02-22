// filepath: /c:/Users/user/Desktop/testing/api/models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;