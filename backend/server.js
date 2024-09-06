const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

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

const PORT = process.env.PORT || 5000;


let server;

if (!module.parent) {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Address already in use. Server might already be running.');
      process.exit(1);
    }
  });
}

module.exports = app;