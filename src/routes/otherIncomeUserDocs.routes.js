const express = require("express");
const { OtherIncomeUserDocsController } = require("../controllers/otherIncomeUserDocs.controllers");
const { Auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

// get routes
router.get("/", OtherIncomeUserDocsController.get);
router.get("/own", [Auth] ,OtherIncomeUserDocsController.own);
router.get("/:id", OtherIncomeUserDocsController.getParticular);

// post routes
router.post("/", [Auth], OtherIncomeUserDocsController.create);

// put routes
router.put("/:id", OtherIncomeUserDocsController.edit);

// delete routes
router.delete("/:id", OtherIncomeUserDocsController.delete);

module.exports.OtherIncomeUserDocsRouter = router;
