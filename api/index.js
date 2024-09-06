const express = require('express');
const mongoose = require('mongoose');
const app = express();

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = db;
  return db;
}

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working' });
});

app.get('/api/db', async (req, res) => {
  try {
    await connectToDatabase();
    res.json({ message: 'Database connected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', message: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

module.exports = async (req, res) => {
  try {
    app(req, res);
  } catch (error) {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};