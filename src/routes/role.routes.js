const express = require("express");
const { RoleController } = require("../controllers/role.controllers");
const { Auth } = require("../middlewares/auth.middlewares")
const router = express.Router();

// get routes
router.get("/", RoleController.get);
router.get("/:id", RoleController.getParticular);

// post routes
router.post("/", [Auth], RoleController.create);

// put routes
router.put("/:id", RoleController.edit);

// delet routes
router.delete("/:id", RoleController.delete);

module.exports.RoleRouter = router;
