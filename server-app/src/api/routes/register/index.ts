import express, { Request, Response } from "express";
import eventregisterController from "../../controllers/eventregister/index";
import { authenticateUser } from "../../../middlewares/auth";
const router = express.Router();

router.post("/create", eventregisterController.createEventRegistration);
router.delete("/delete/:registrationId", eventregisterController.deleteEventRegistration);
router.get('/participation/:userId', eventregisterController.getParticipatoryEvents);

export default router;
