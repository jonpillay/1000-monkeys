require('dotenv').config()

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const connectToMongo = require("./database/db-connection")

const ImagesRouter = require('./routes/images');
const StoryRouter = require("./routes/story");
const PopulateRouter = require("./routes/populate");
const UserRouter = require('./routes/users');
const StoryPersistenceRouter = require('./routes/storyPersistence')


const app = express();

// setup for receiving JSON
app.use(express.json())

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// route setup
app.use("/images", ImagesRouter)
app.use("/story", StoryRouter)
app.use("/populate", PopulateRouter)
app.use("/user", UserRouter)
app.use("/save", StoryPersistenceRouter)


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