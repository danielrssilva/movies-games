const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieName: String,
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
  return mongoose.connect(process.env.MONGODB_URI);
}

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    const { method, query } = req;
    const id = query.id;

    // Movie CRUD operations
    if (req.url.startsWith('/api/movies')) {
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
      }
    }
    // Game CRUD operations
    else if (req.url.startsWith('/api/games')) {
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
      }
    } else {
      res.status(404).json({ message: 'Not Found' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};