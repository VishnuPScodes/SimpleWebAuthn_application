import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  authenticators: [],
  challenge: {
    type: String,
  },
});

export const Users = mongoose.model('user', userSchema);
