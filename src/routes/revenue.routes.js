const express = require("express");
const { RevenueController } = require("../controllers/revenue.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();


//get requests
router.get("/",RevenueController.get);
router.get("/user/my",RevenueController.getOwnRevenues);
router.get("/user/:id",RevenueController.getParticularUserRevenues);
router.get("/after/:date", RevenueController.getDuring)

//post requests
router.post("/",RevenueController.create);

//put requests
router.put("/:id",RevenueController.edit);

//patch requests

//delete requests
router.delete("/:id",RevenueController.delete);


module.exports.RevenueRouter = router;
