//dependencies
const express = require('express');
var bodyParser = require("body-parser");
const path = require('path');
const app = express();
const routes = require("../routes");
var db = require("../models");

//connections
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const mlab = "mongodb://admin:bootcamp123@ds159776.mlab.com:59776/heroku_vg8qr96g"

const local = "mongodb://localhost/trendingreviewapp"

var MONGODB_URI = process.env.MONGODB_URI || mlab;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});



