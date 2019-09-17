const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const RESTserver = require('the.rest');
mongoose.connect('mongodb://localhost/time-for-friends', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
 

// Create an Express server
const app = express();
 
// ..and install the.rest as middleware
// you need to tell it two things:
// 1) the base route to its api
// 2) the path to a folder with mongoose-models 
//    Please Note: The path must be absolute
const pathToModelFolder = path.join(__dirname, 'mongoose-models');
app.use(RESTserver('/api', pathToModelFolder));


// Add other middleware you might need (express.static etc)
 
// Listen on port 5000
app.listen(5000, () => console.log('Listening on port 5000'));

const ImporterToDb = require('./ImporterToDb');
