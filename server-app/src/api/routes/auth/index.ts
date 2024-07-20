/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import express from "express";
import authController from "../../controllers/auth/index";
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/send-verification", authController.sendVerificationLink);
router.post("/reset-password", authController.resetPassword);

export default router;
