const mongoose = require("mongoose");

const googleReviewSchema = new mongoose.Schema({
  author_name: String,
  rating: Number,
  text: String,
  time: Date,
});

module.exports = mongoose.model("GoogleReview", googleReviewSchema);

//<your_place_id> : Google Place ID
//<your_google_api_key> : google api key
