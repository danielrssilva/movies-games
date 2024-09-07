console.log('Starting server...');
require('dotenv').config({ path: './.env' });
console.log('Environment variables loaded. MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'Undefined');

const express = require('express');  // Changed this line
const mongoose = require('mongoose');
const cors = require('cors');

console.log('Modules loaded');

const movieSchema = new mongoose.Schema({
  person: String,
  watched: Boolean,
  poster: String,
  rating: Number,
  year: Number,
  movieName: String
});

const gameSchema = new mongoose.Schema({
  gameName: String,
  played: Boolean
});

const Movie = mongoose.model('Movie', movieSchema);
const Game = mongoose.model('Game', gameSchema);

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/moviesgamesdb';
  console.log('Connecting to MongoDB with URI:', uri);
  return mongoose.connect(uri);
}

const handler = async (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  try {
    await connectToDatabase();

    const { method, query } = req;
    const id = query.id;

    // Movie CRUD operations
    if (req.url.startsWith('/movies' || req.url.startsWith('/api/movies'))) {
      if (method === 'GET' && !id) {
        const movies = await Movie.find();
        res.status(200).json(movies);
      } else if (method === 'GET' && id) {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie);
      } else if (method === 'POST') {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
      } else if (method === 'PUT' && id) {
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(updatedMovie);
      } else if (method === 'DELETE' && id) {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json({ message: 'Movie deleted successfully' });
      } else {
        res.status(400).json({ message: 'Invalid request' });
      }
    }
    // Game CRUD operations
    else if (req.url.startsWith('/games' || req.url.startsWith('/api/games'))) {
      if (method === 'GET' && !id) {
        const games = await Game.find();
        res.status(200).json(games);
      } else if (method === 'GET' && id) {
        const game = await Game.findById(id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        res.status(200).json(game);
      } else if (method === 'POST') {
        const newGame = new Game(req.body);
        await newGame.save();
        res.status(201).json(newGame);
      } else if (method === 'PUT' && id) {
        const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGame) return res.status(404).json({ message: 'Game not found' });
        res.status(200).json(updatedGame);
      } else if (method === 'DELETE' && id) {
        const deletedGame = await Game.findByIdAndDelete(id);
        if (!deletedGame) return res.status(404).json({ message: 'Game not found' });
        res.status(200).json({ message: 'Game deleted successfully' });
      } else {
        res.status(400).json({ message: 'Invalid request' });
      }
    } else {
      res.status(404).json({ message: 'Not Found' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

try {
  if (require.main === module) {
    const app = express();

    // Add CORS middleware
    app.use(cors());

    app.use(express.json());
    app.use('/api', handler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
} catch (error) {
  console.error('Error starting server:', error);
}

module.exports = handler;