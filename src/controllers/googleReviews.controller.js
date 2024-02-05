const GoogleReview = require("../models/googleReview.model");
const { fetchReviews } = require("../helpers/googleReviews.helper");

exports.fetchGoogleReviews = async (req, res) => {
  try {
    const placeId = req.query.placeId;
    if (!placeId) {
      return res.status(400).json({ error: "Missing placeId query parameter" });
    }

    const reviews = await fetchReviews(placeId);
    const savedReviews = await GoogleReview.insertMany(reviews);

    res.json(savedReviews);
  } catch (error) {
    console.error(`Error fetching and saving Google reviews:`, error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching Google reviews" });
  }
};
