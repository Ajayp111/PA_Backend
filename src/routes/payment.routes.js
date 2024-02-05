const express = require("express");
const { PaymentController } = require("../controllers/payment.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();


//get requests
router.get("/",PaymentController.get);
router.get("/my",[Auth],PaymentController.getAllPaymentsOfOwn);
router.get("/after/:date", PaymentController.getDuring)

// //post requests
router.post("/:orderId",PaymentController.create);

// //put requests
router.put("/:id",PaymentController.edit);

// //patch requests

// //delete requests
router.delete("/:id",PaymentController.delete);


module.exports.PaymentRouter = router;
