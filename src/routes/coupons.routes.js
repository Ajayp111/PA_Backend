const express = require("express");
const router = express.Router();
const { Auth } = require("../middlewares/auth.middlewares");
const { CouponsController } = require("../controllers/Coupons.controllers");

// Create a new Coupons
router.post("/create", CouponsController.createCoupons);

// Get all Coupons
router.get("/getAll", CouponsController.getAllCoupons);

// Get a Coupons by ID
router.get("/:id", CouponsController.getCouponsById);

// Update a Coupons by ID
router.put("/:id", CouponsController.updateCoupons);

// Delete a Coupons by ID
router.delete("/:id", CouponsController.deleteCoupons);

module.exports.CouponsRouters = router;
