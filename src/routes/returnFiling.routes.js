const express = require("express");
const { ReturnFilingController } = require("../controllers/returnFiling.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();


//get requests
router.get("/",ReturnFilingController.get);
router.get("/my",[Auth],ReturnFilingController.getCurrentUserReturnFile);
router.get("/:id",ReturnFilingController.getParticular);

//post requests
router.post("/",ReturnFilingController.create);

//put requests
router.put("/:id",ReturnFilingController.edit);

//delete requests
router.delete("/:id",ReturnFilingController.delete);

module.exports.ReturnFilingRouter = router;
