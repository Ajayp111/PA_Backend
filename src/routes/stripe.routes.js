

const express = require("express");
const { StripeController } = require("../controllers/stripe.controller");
const { Auth } = require("../middlewares/auth.middlewares")
const router = express.Router();

// get routes
router.post("/pricing",[Auth], StripeController.pricingPayment);

// post routes
// router.post("/", [Auth], RoleController.create);


module.exports.StripeRouter = router;
