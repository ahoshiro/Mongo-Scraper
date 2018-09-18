
// Require Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan'); // for debugging
const router = require('./controllers/controller.js');
const Article = require('./models/Article.js'); // Import the Article model
const db = mongoose.connection;
const app = express();
const port = process.env.PORT || 3000;

// Initialize Express for debugging & body parsing

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve Static Content
app.use(express.static(process.cwd() + '/public'));

// Connect to the Mongo DB
if(process.env.NODE_ENV == 'production'){
  // Use link given by Heroku Mongo, if no connection it will go local
  mongoose.connect('mongodb://ahoshiro:<dbpassword>@ds143340.mlab.com:43340/heroku_j1hbm0m3');
}
else{
  mongoose.connect('mongodb://localhost/nytreact');
}

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection is successful.');
});

// Import Routes/Controller

app.use('/', router);

// Start the API server

app.listen(port, function(){
  console.log('🌎  ==> API Server now listening on PORT: ' + port);
});