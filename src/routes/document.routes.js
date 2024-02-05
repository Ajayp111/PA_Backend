const express = require("express");
const { Auth } = require("../middlewares/auth.middlewares");
const { DocumentControllers } = require("../controllers/documents.controllers");
const router = express.Router();

//get requests
router.get("/", [Auth], DocumentControllers.get);

//post requests
router.post("/", [Auth], DocumentControllers.create);

//put requests
router.put("/:id", DocumentControllers.edit);

//patch requests

//delete requests
router.delete("/:id", DocumentControllers.delete);

module.exports.DocumentRouter = router;
