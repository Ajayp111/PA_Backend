const express = require("express");
const googleReviewsController = require("../controllers/googleReviews.controller");

const router = express.Router();

router.get("/", googleReviewsController.fetchGoogleReviews);

module.exports = router;
