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

const activitySchema = new mongoose.Schema({
  date: Date,
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'activityType'
  },
  activityType: {
    type: String,
    required: true,
    enum: ['Game', 'Movie']
  }
});

const yearActivitiesSchema = new mongoose.Schema({
  year: Number,
  activities: [activitySchema]
});

const Activity = mongoose.model('Activity', activitySchema);
const YearActivities = mongoose.model('YearActivities', yearActivitiesSchema);
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
    else if (req.url.startsWith('/api/games')) {
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
    }
    // Activities CRUD operations
    else if (req.url.startsWith('/activity') || req.url.startsWith('/api/activity')) {
    else if (req.url.startsWith('/activity')) {
      if (method === 'GET' && !id) {
        const activities = await Activity.find().populate('activity');
        const filteredActivities = activities.filter(({ activity }) => activity !== null);
        activities.forEach((activity) => {
          if (activity.activity === null) {
            console.log('Activity is null. Deleting...', activity);
            Activity.findByIdAndDelete(activity._id);
          }
        })
        res.status(200).json(filteredActivities);
      } else if (method === 'GET' && id) {
        const activity = await Activity.findById(id).populate('activity');
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        res.status(200).json(activity);
      } else if (method === 'POST') {
        const { date, activityModel } = req.body;
        const newActivity = new Activity({
          date,
          activity: activityModel._id,
          activityType: activityModel.gameName ? 'Game' : 'Movie'
        });
        await newActivity.save();
        res.status(201).json(newActivity);
      } else if (method === 'PUT' && id) {
        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedActivity) return res.status(404).json({ message: 'Activity not found' });
        res.status(200).json(updatedActivity);
      } else if (method === 'DELETE' && id) {
        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity) return res.status(404).json({ message: 'Activity not found' });
        res.status(200).json({ message: 'Activity deleted successfully' });
      } else {
        res.status(400).json({ message: 'Invalid request' });
      }
    }
    // YearActivities CRUD operations
    else if (req.url.startsWith('/yearActivities' || req.url.startsWith('/api/yearActivities'))) {
    else if (req.url.startsWith('/yearActivities')) {
      if (method === 'POST') {
        const newYearActivities = new YearActivities(req.body);
        await newYearActivities.save();
        res.status(201).json(newYearActivities);
      }
      if (method === 'GET' && !id) {
        const yearActivities = await YearActivities.find();
        res.status(200).json(yearActivities);
      }
      if (method === 'PUT' && id) {
        const updatedYearActivities = await YearActivities.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedYearActivities) return res.status(404).json({ message: 'YearActivities not found' });
        res.status(200).json(updatedYearActivities);
      }
      if (method === 'DELETE' && id) {
        const deletedYearActivities = await YearActivities.findByIdAndDelete(id);
        if (!deletedYearActivities) return res.status(404).json({ message: 'YearActivities not found' });
        res.status(200).json({ message: 'YearActivities deleted successfully' });
      }
    }
    else {
      res.status(404).json({ message: 'Not Found' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};};
};
