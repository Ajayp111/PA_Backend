const express = require("express");
const { FAQControllers } = require("../controllers/faq.controllers")
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();


//get requests
router.get("/",FAQControllers.get);
router.get("/:id",FAQControllers.getParticular);

//post requests
router.post("/",[Auth],FAQControllers.create);

//put requests
router.put("/:id",FAQControllers.edit);

//patch requests

//delete requests
router.delete("/:id",FAQControllers.delete);


module.exports.FAQRouter = router;

