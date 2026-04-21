const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://atlas-uri');
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.error('Atlas connection failed', error);
  }
};
module.exports = connectDB;