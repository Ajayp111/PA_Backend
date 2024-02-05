const express = require("express");
const {
  NotificationControllers,
} = require("../controllers/notification.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();

// get routes
router.get("/", NotificationControllers.get);
router.get("/my", [Auth], NotificationControllers.getOwn);
router.get("/:id", NotificationControllers.getParticular);

// post routes
router.post("/", [Auth], NotificationControllers.create);

// put routes
router.put("/:id", NotificationControllers.edit);
router.put("/read/:id", NotificationControllers.setRead);

// delete routes
router.delete("/:id", NotificationControllers.delete);

module.exports.NotificationRouter = router;
