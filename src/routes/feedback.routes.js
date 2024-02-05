const express = require("express");
const {Auth} = require("../middlewares/auth.middlewares")
const { FeedbackController } = require("../controllers/feedback.controllers");
const router = express.Router();


//get requests
router.get("/", [Auth] ,FeedbackController.get);
router.get("/:id", [Auth] ,FeedbackController.getParticular);

//post requests
router.post("/" , [Auth] , FeedbackController.create);

//put requests
router.put("/:id",FeedbackController.edit);

//patch requests

//delete requests
router.delete("/:id",FeedbackController.delete);


module.exports.FeedbackRouter = router;
