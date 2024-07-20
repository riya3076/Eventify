/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import express from "express";
import userController from "../../controllers/user/index";
const router = express.Router();

router.put("/update/:userId", userController.updateUser);
router.post("/send-email", userController.sendEmail);
router.get("/get-user-name/:userId", userController.getUserNameById);

export default router;
