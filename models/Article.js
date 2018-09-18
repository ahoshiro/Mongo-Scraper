const mongoose = require('mongoose');// Require Mongoose
const Schema = mongoose.Schema; // Create a Schema Class
const ArticleSchema = new Schema({ // Create Article Schema

  // Title of Article
  title: {
    type: String,
    required: true
  },

  // Date of Article
  date: {
    type: String,
    required: true
  },
  
  // Link to Article
  url: {
    type: String,
    required: true
  }

});

// Create the Article model with Mongoose
var Article = mongoose.model('Article', ArticleSchema);

// Export the Model
module.exports = Article;