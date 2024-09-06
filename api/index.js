const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define your MongoDB schema and model here
const MovieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number
});

const Movie = mongoose.model('Movie', MovieSchema);

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
}

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    
    // Example: Get all movies
    if (req.method === 'GET') {
      const movies = await Movie.find();
      res.status(200).json(movies);
    }
    
    // Example: Add a new movie
    else if (req.method === 'POST') {
      const newMovie = new Movie(req.body);
      await newMovie.save();
      res.status(201).json(newMovie);
    }
    
    // Add other CRUD operations as needed
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};