const mongoose = require('mongoose');

// Test 1: Basic response
async function test1(req, res) {
  res.status(200).json({ message: 'Test 1: Basic response successful' });
}

// Test 2: Environment variable
async function test2(req, res) {
  const uri = process.env.MONGODB_URI;
  res.status(200).json({ message: 'Test 2: Environment variable', uriLength: uri ? uri.length : 0 });
}

// Test 3: MongoDB connection attempt
async function test3(req, res) {
  console.log('Test 3: Attempting MongoDB connection');
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log('Test 3: MongoDB connected successfully');
    res.status(200).json({ message: 'Test 3: MongoDB connected successfully' });
  } catch (error) {
    console.error('Test 3: MongoDB connection error:', error);
    res.status(500).json({ error: 'Test 3: MongoDB connection failed', message: error.message });
  } finally {
    await mongoose.disconnect();
  }
}

// Main handler
module.exports = async (req, res) => {
  console.log('Function invoked');
  const { test } = req.query;

  switch(test) {
    case '1':
      await test1(req, res);
      break;
    case '2':
      await test2(req, res);
      break;
    case '3':
      await test3(req, res);
      break;
    default:
      res.status(400).json({ message: 'Please specify a test number (1, 2, or 3) in the query parameter' });
  }
};