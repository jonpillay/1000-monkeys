require('dotenv').config()

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const connectToMongo = require("./database/db-connection")

const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const app = express();
app.use(cors(corsOptions))

const NodeCache = require('node-cache')

const cache = new NodeCache({ stdTTL: 3600 });

// setup for receiving JSON
app.use(express.json())

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const ImagesRouter = require('./routes/images');
const StoryRouter = require("./routes/story");
const UserRouter = require('./routes/users');
const StoryPersistenceRouter = require('./routes/storyPersistence')
const FetchStoriesRouter = require('./routes/fetchStories')
const CheckAPIRouter = require("./routes/checkAPI")
const SystemInitRouter = require("./routes/systemInit")

// route setup
app.use("/images", ImagesRouter)
app.use("/story", StoryRouter)
// app.use("/populate", PopulateRouter)
app.use("/user", UserRouter)
app.use("/save", StoryPersistenceRouter)
app.use("/fetch-stories", FetchStoriesRouter)
app.use("/check-api", CheckAPIRouter)
app.use("/initialise-sys", SystemInitRouter)

// connect to db

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