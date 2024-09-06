const mongoose = require('mongoose');

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    res.status(200).json({ message: 'Connected to MongoDB successfully' });
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};