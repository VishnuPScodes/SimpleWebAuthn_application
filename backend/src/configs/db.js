import mongoose from 'mongoose';

export const connectWithMongoDB = async (url) => {
  await mongoose.connect(url);
};
