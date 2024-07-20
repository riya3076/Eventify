import express from "express";
import paymentController from "../../controllers/payment";
const router = express.Router();

router.post("/pay", paymentController.makePayment);

export default router;