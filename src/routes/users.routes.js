const express = require("express");
const { UserController } = require("../controllers/user.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();

//get requests
router.get("/", [Auth], UserController.getAllVerifiedUsers);
router.get("/assigned", [Auth], UserController.getAllAssignedUsers);
router.get("/admin/all", [Auth], UserController.getAllUsers);
router.get("/own/pricing", [Auth], UserController.getCurrentUserPricing);
router.get("/own", [Auth], UserController.getCurrentUser);
router.get("/admins", UserController.getAllAdminUsers);
router.get("/admins/attributes", [Auth], UserController.adminAttributesOfUsers);
router.get("/staff", UserController.getStaff);
router.get("/:userId", [Auth], UserController.getUserDetails);

//post requests
router.post("/signUp", UserController.signUp);
router.post("/signUpGoogle", UserController.signUpGoogle);
router.post("/verify/phone", UserController.verifyOtp);
router.post("/login", UserController.login);
router.post("/login/admin", UserController.loginViaPassword);
router.post("/forgot-password", UserController.forgotPassword);

router.post("/create/admin", UserController.createAdminUser);
router.post("/create/user", [Auth], UserController.createNewUser);

//put requests
router.put("/update/me", [Auth], UserController.editCurrentUser);
router.put("/admins/:id", UserController.editAdminUser);
router.put("/documents", [Auth], UserController.addAdditionalDocs);
router.put("/:userId", UserController.editProfile);

//patch requests
router.patch("/email/verify/:token", UserController.verifyEmail);

//delete requests
router.delete("/admins/:id", UserController.deleteAdminUser);

module.exports.UserRouter = router;
