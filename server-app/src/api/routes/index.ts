/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import express from "express";
const router = express.Router();
import auth from "./auth";
import event from "./event";
import payment from "./payment";
import user from "./user";
import register from "./register";
import badge from "./badge";

router.use("/auth", auth);
router.use("/event", event);
router.use("/payment", payment);
router.use("/user", user);
router.use("/register", register);
router.use("/badge", badge);

export default router;
