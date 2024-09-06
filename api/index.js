const mongoose = require('mongoose');

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