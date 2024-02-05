const express = require("express");
const {
  SubscriptionController,
} = require("../controllers/subscription.controllers");
const router = express.Router();

//get requests
router.get("/", SubscriptionController.get);

//post requests
router.post("/", SubscriptionController.create);

//put requests
router.put("/:id", SubscriptionController.edit);

//patch requests

//delete requests
router.delete("/:id", SubscriptionController.delete);

module.exports.SubscriptionRouter = router;
