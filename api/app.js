const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");

const MessagesRouter = require("./routes/messages");
const ImagesRouter = require('./routes/images');
const StoryController = require("./controllers/storyText");

const app = express();

// setup for receiving JSON
app.use(express.json())

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



// JP. I'm a bit unser about how we're going to fire both controllers. I think we need to think about mixing them together 
// route setup
app.use("/", MessagesRouter);
app.use("/images", ImagesRouter)
app.use("/story", StoryController)

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
