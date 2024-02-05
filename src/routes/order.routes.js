const express = require("express");
const { OrderController } = require("../controllers/order.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();

//get requests
router.get("/", OrderController.get);
router.get("/my", [Auth], OrderController.getAllOrdersOfOwn);
router.get("/:id", OrderController.getParticular);
router.get("/after/:date", OrderController.getDuring);

//post requests
router.post("/", [Auth], OrderController.create);
router.post("/payment/skip", [Auth], OrderController.createSkippedOrder);

//put requests
router.put(
  "/payment/sucess/:sessionId",
  [Auth],
  OrderController.sucessViaSession
);
router.put(
  "/payment/failed/:sessionId",
  [Auth],
  OrderController.failedViaSession
);
router.put("/:id", OrderController.edit);

//patch requests

//delete requests
router.delete("/:id", OrderController.delete);

module.exports.OrderRouter = router;
