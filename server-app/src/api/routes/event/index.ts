import express from "express";
import eventController from "../../controllers/event";
import { authenticateUser } from "../../../middlewares/auth";
import { generateAndDownloadCertificate } from "../../../utils/certificate";
import eventAnalyticsController from "../../controllers/analytics";
const router = express.Router();

router.post("/create", eventController.createEvent);
router.put("/update", eventController.updateEvent);
router.delete("/delete", eventController.deleteEvent);
router.get("/organizer/:organizerId", eventController.getEventsByOrganizer);
router.get(
  "/events-exclude-organizer/:organizerId",
  eventController.getEventsExcludingOrganizer
);
router.post("/wishlist/add", eventController.addToWishlist);
router.delete("/wishlist/remove/:userId", eventController.removeFromWishlist);
router.get("/wishlist/:userId", eventController.getWishlistEvents);
router.get("/certificate/:userId/:eventId", generateAndDownloadCertificate);
router.get(
  "/events-registered-byuser/:userId",
  eventController.getEventsRegisteredByUser
);

router.get("/event/:eventId", eventController.getEventById);
router.get("/all", eventController.getAllEvents);
router.get("/event-data", eventAnalyticsController.getEventData);

export default router;
