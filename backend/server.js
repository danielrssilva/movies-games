const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  cachedDb = db;
  return db;
}

const movieSchema = new mongoose.Schema({
  movieName: String,
  person: String,
  watched: Boolean
});

const gameSchema = new mongoose.Schema({
  gameName: String,
  played: Boolean
});

const Movie = mongoose.model('Movie', movieSchema);
const Game = mongoose.model('Game', gameSchema);

// Movie routes
app.get('/api/movies', async (req, res) => {
  await connectToDatabase();
  const movies = await Movie.find();
  res.json(movies);
});

app.post('/api/movies', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

app.put('/api/movies/:id', async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
});

app.delete('/api/movies/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
});

// Game routes
app.get('/api/games', async (req, res) => {
  await connectToDatabase();
  const games = await Game.find();
  res.json(games);
});

app.post('/api/games', async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.json(game);
});

app.put('/api/games/:id', async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(game);
});

app.delete('/api/games/:id', async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json({ message: 'Game deleted' });
});

// Remove the server listening code

module.exports = async (req, res) => {
  await connectToDatabase();
  app(req, res);
};