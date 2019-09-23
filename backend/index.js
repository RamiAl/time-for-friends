const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const theRest = require('the.rest');

// Connect to MongoDB via Mongoose
mongoose.connect('mongodb://localhost/db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Create an Express server
const app = express();

// ..and install the.rest as middleware
// Arguments/configuration:
// 1) The express library
// 2) The base route for the REST api to create
// 3) The path to a folder with mongoose-models 
//    Please Note: This path must be absolute
const pathToModelFolder = path.join(__dirname, 'mongoose-models');
app.use(theRest(express, '/api', pathToModelFolder));

// Add other middleware you might need (express.static etc)

// Listen on port 5000
app.listen(5000, () => console.log('Listening on port 5000'));

const ImporterToDb = require('./ImporterToDb');
