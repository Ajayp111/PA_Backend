const axios = require("axios");
const cheerio = require("cheerio");

async function fetchReviews(placeId) {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=review&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.result.reviews;
  } catch (error) {
    console.error(
      `Error fetching reviews for placeId ${placeId}:`,
      error.message
    );
    return [];
  }
}

module.exports = { fetchReviews };
