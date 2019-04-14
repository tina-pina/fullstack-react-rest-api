'use strict';

// create the Express app
var express = require("express");
var app = express();
var routes = require("./routes");
var logger = require('morgan');
var jsonParser = require("body-parser").json;
var cors = require('cors')

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// setup morgan which gives us http request logging
app.use(logger("dev"));
app.use(jsonParser());

// to allow request among different origins/domains -> cors npm package 
app.use(cors())

// mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fsjstd-restapi", { useNewUrlParser: true });
var db = mongoose.connection;

//if there's an error connecting to the database
db.on("error", function (err) {
  console.error("connection error:", err);
})

//if successful
db.once("open", function () {
  console.log("db connection successful")
})

// API
app.use("/api", routes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
