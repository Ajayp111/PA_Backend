const express = require("express");
const { BlogControllers } = require("../controllers/blog.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();

//get requests
router.get("/", BlogControllers.get);
router.get("/:id", BlogControllers.getParticular);

//post requests
router.post("/", [Auth], BlogControllers.create);

//put requests
router.put("/:id", BlogControllers.edit);

//patch requests

//delete requests
router.delete("/", BlogControllers.delete);

module.exports.BlogRouter = router;
