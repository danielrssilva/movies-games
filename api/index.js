const mongoose = require('mongoose');

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  cachedDb = db;
  return db;
}

module.exports = async (req, res) => {
  try {
    const db = await connectToDatabase();
    // Use db to perform operations
    res.status(200).json({ message: 'Connected to database successfully' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};