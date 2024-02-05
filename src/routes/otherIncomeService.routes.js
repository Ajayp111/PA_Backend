const express = require("express");
const {
  OtherIncomeSourceController,
} = require("../controllers/otherIncomeSource.controller");
const { Auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

// get routes
router.get("/", OtherIncomeSourceController.get);
router.get("/own", [Auth], OtherIncomeSourceController.own);
router.get("/:id", OtherIncomeSourceController.getParticular);

// post routes
router.post("/", [Auth], OtherIncomeSourceController.create);

// put routes
router.put("/:id", OtherIncomeSourceController.edit);

// delete routes
router.delete("/:id", OtherIncomeSourceController.delete);

module.exports.OtherIncomeSourceRouter = router;
