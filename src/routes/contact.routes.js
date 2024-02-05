const express = require("express");
const { ContactControllers } = require("../controllers/contact.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();

//get requests
router.get("/", ContactControllers.get);
router.get("/:id", ContactControllers.getParticular);

//post requests
router.post("/", ContactControllers.create);

//put requests
router.put("/:id", ContactControllers.edit);

//patch requests

//delete requests
router.delete("/:id", ContactControllers.delete);

module.exports.ContactRouter = router;
