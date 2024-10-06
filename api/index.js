require("dotenv").config({ path: "./.env" });

const express = require("express"); // Changed this line
const mongoose = require("mongoose");
const cors = require("cors");

const movieSchema = new mongoose.Schema({
  movieName: String,
  person: String,
  watched: Boolean,
  poster: String,
  rating: Number,
  year: Number,
  movieName: String,
  ratings: {
    hakush: Number,
    thaai: Number,
    danny: Number,
  },
});

const gameSchema = new mongoose.Schema({
  rating: Number,
  name: String,
  cover: {
    url: String,
  },
  played: Boolean,
  isRecurring: Boolean,
  release_dates: [
    {
      y: Number,
    },
  ],
});

const activitySchema = new mongoose.Schema({
  date: Date,
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "activityType",
  },
  activityType: {
    type: String,
    required: true,
    enum: ["Game", "Movie"],
  },
});

const yearActivitiesSchema = new mongoose.Schema({
  year: Number,
  activities: [activitySchema],
});

const Activity = mongoose.model("Activity", activitySchema);
const YearActivities = mongoose.model("YearActivities", yearActivitiesSchema);
const Movie = mongoose.model("Movie", movieSchema);
const Game = mongoose.model("Game", gameSchema);

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  const uri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/moviesgamesdb";
  return mongoose.connect(uri);
}

const handler = async (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  try {
    await connectToDatabase();

    const { method, query } = req;
    const id = query.id;
    const search = query.search;

    // Movie CRUD operations
    if (req.url.startsWith("/api/movies") || req.url.startsWith("/movies")) {
      if (method === "GET" && !id) {
        const movies = await Movie.find();
        res.status(200).json(movies);
      } else if (method === "GET" && id) {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json(movie);
      } else if (method === "POST") {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
      } else if (method === "PUT" && id) {
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedMovie)
          return res.status(404).json({ message: "Movie not found" });
        res.status(200).json(updatedMovie);
      } else if (method === "DELETE" && id) {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie)
          return res.status(404).json({ message: "Movie not found" });
        res.status(200).json({ message: "Movie deleted successfully" });
      } else {
        res.status(400).json({ message: "Invalid request" });
      }
    } else if (
      req.url.startsWith("/games/search") ||
      req.url.startsWith("/games/search")
    ) {
      const clientId = process.env.TWITCH_CLIENT_ID;
      const clientSecret = process.env.TWITCH_CLIENT_SECRET;
      const awsKey = process.env.AWS_KEY;
      const clientCredentials = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
        { method: "POST" }
      );
      const clientCredentialsResult = await clientCredentials.json();
      const gamesSearch = await fetch(
        "https://dvpzbd5az0.execute-api.us-west-2.amazonaws.com/",
        {
          method: "POST",
          headers: {
            "x-api-key": awsKey,
            Accept: "application/json",
            "Client-ID": clientId,
            Authorization: `Bearer ${clientCredentialsResult.access_token}`,
          },
          body: `fields name, cover.url, involved_companies.company.name, release_dates.y, rating; search "${search}";`,
        }
      );
      const gamesSearchResult = await gamesSearch.json();
      res.status(200).json(gamesSearchResult);
    }
    // Game CRUD operations
    else if (req.url.startsWith("/api/games") || req.url.startsWith("/games")) {
      if (method === "GET" && !id) {
        const games = await Game.find();
        res.status(200).json(games);
      } else if (method === "GET" && id) {
        const game = await Game.findById(id);
        if (!game) return res.status(404).json({ message: "Game not found" });
        res.status(200).json(game);
      } else if (method === "POST") {
        const newGame = new Game(req.body);
        await newGame.save();
        res.status(201).json(newGame);
      } else if (method === "PUT" && id) {
        const updatedGame = await Game.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedGame)
          return res.status(404).json({ message: "Game not found" });
        res.status(200).json(updatedGame);
      } else if (method === "DELETE" && id) {
        const deletedGame = await Game.findByIdAndDelete(id);
        if (!deletedGame)
          return res.status(404).json({ message: "Game not found" });
        res.status(200).json({ message: "Game deleted successfully" });
      } else {
        res.status(400).json({ message: "Invalid request" });
      }
    }
    // Activities CRUD operations
    else if (
      req.url.startsWith("/activity") ||
      req.url.startsWith("/api/activity")
    ) {
      if (method === "GET" && !id) {
        const activities = await Activity.find().populate("activity");
        const filteredActivities = activities.filter(
          ({ activity }) => activity !== null
        );
        res.status(200).json(filteredActivities);
      } else if (method === "GET" && id) {
        const activity = await Activity.findById(id).populate("activity");
        if (!activity)
          return res.status(404).json({ message: "Activity not found" });
        res.status(200).json(activity);
      } else if (method === "POST") {
        const { date, activityModel } = req.body;
        const newActivity = new Activity({
          date,
          activity: activityModel._id,
          activityType: activityModel.name ? "Game" : "Movie",
        });
        await newActivity.save();
        res.status(201).json(newActivity);
      } else if (method === "PUT" && id) {
        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedActivity)
          return res.status(404).json({ message: "Activity not found" });
        res.status(200).json(updatedActivity);
      } else if (method === "DELETE" && id) {
        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity)
          return res.status(404).json({ message: "Activity not found" });
        res.status(200).json({ message: "Activity deleted successfully" });
      } else {
        res.status(400).json({ message: "Invalid request" });
      }
    }
    // YearActivities CRUD operations
    else if (
      req.url.startsWith("/yearActivities") ||
      req.url.startsWith("/api/yearActivities")
    ) {
      if (method === "POST") {
        const newYearActivities = new YearActivities(req.body);
        await newYearActivities.save();
        res.status(201).json(newYearActivities);
      }
      if (method === "GET" && !id) {
        const yearActivities = await YearActivities.find();
        res.status(200).json(yearActivities);
      }
      if (method === "PUT" && id) {
        const updatedYearActivities = await YearActivities.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
        if (!updatedYearActivities)
          return res.status(404).json({ message: "YearActivities not found" });
        res.status(200).json(updatedYearActivities);
      }
      if (method === "DELETE" && id) {
        const deletedYearActivities = await YearActivities.findByIdAndDelete(
          id
        );
        if (!deletedYearActivities)
          return res.status(404).json({ message: "YearActivities not found" });
        res
          .status(200)
          .json({ message: "YearActivities deleted successfully" });
      }
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

try {
  if (require.main === module) {
    const app = express();
    // Add CORS middleware
    app.use(cors());
    app.use(express.json());
    app.use("/api", handler);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
} catch (error) {
  console.error("Error starting server:", error);
}

module.exports = handler;
