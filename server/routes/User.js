const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const User = require("../models/user");
const { GenuineTokenLogout } = require("../helpers/user");
const { ValidateToken } = require("../ApiMiddleware");
//
//USER LOGIN ___________________________________________________STARTS
router.post("/login", userCtrl.LoginUser); //login user
router.get("/logout", GenuineTokenLogout, userCtrl.Logout); //log out
//USER LOGIN ___________________________________________________ENDS
//
router.get("/", ValidateToken, userCtrl.Users);
router.get("/:id", ValidateToken, userCtrl.Users);
//
router.delete("/trash/:id", ValidateToken, userCtrl.TrashUser);
router.delete("/:id", ValidateToken, userCtrl.DeleteUser);
//
router.post("/", ValidateToken, userCtrl.CreateUser);
router.put("/:id", ValidateToken, userCtrl.UpdateUser);
//
router.put("/password/update/:id", userCtrl.PasswordUpdate);
router.post("/password/forgot/", userCtrl.PasswordForgot);
router.post("/resend/", userCtrl.ResendOtp); //also for resend otp using email
router.post("/verifyotp/", userCtrl.VerifyOtp);
//

router.post("/loginnn", userCtrl.LoginUserss);

module.exports = router;
