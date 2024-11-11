require('dotenv').config()

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const connectToMongo = require("./database/db-connection")

const app = express();
const NodeCache = require('node-cache')

const sanitiseInput = require('./sanitiseFuncts/sanitiseInput')

const cache = new NodeCache({ stdTTL: 3600 });

// setup for receiving JSON
app.use(express.json())

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const ImagesRouter = require('./routes/images');
const StoryRouter = require("./routes/story");
const PopulateRouter = require("./routes/populate");
const UserRouter = require('./routes/users');
const StoryPersistenceRouter = require('./routes/storyPersistence')
const FetchStoriesRouter = require('./routes/fetchStories')

const fetchBadWordsList = require('./sanitiseFuncts/badWordListFetch')

// route setup
app.use("/images", ImagesRouter)
app.use("/story", StoryRouter)
app.use("/populate", PopulateRouter)
app.use("/user", UserRouter)
app.use("/save", StoryPersistenceRouter)
app.use("/fetch-stories", FetchStoriesRouter)


// connect to db

// setup endpoint for badWordsList.
app.get('api/checkinput', async (req, res) => {

  let badWordsList = cache.get('badWordsList');

  if (!badWordsList) {
    try {
      badWordsList = await fetchBadWordsList()
    } catch (error) {
      res.status(500).json({ error: error})
    }
  }

  const formInput = req.params.input

  const inputCheck = sanitiseInput(formInput, badWordsList)

  if (inputCheck == true) {
    res.status(200).json({ decision: 1 })
  } else if (inputCheck == false) {
    res.status(200).json( { decision: 0 })
  } else {
    res.status(500).json( { error: "Sanitise API Not Working" })
  }
});

// const createWordCheckEndPoint

connectToMongo()

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({message: 'server error'})
});

module.exports = app;