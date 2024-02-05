const express = require("express");
const {
  SubscriberControllers,
} = require("../controllers/subscriber.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();

//get requests
router.get("/", SubscriberControllers.get);

//post requests
router.post("/", SubscriberControllers.create);

//put requests
router.put("/:id", SubscriberControllers.edit);

//patch requests

//delete requests
router.delete("/:id", SubscriberControllers.delete);

module.exports.SubscriberRouter = router;
