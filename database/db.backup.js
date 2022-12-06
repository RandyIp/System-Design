const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// repo ID, username, repo name, description, url, stargazers
let repoSchema = mongoose.Schema({
  review_id: Number,
  product_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: String,
  reported: Boolean,
  Characteristic_IDs: Number
});

let Review = mongoose.model('Review', repoSchema);