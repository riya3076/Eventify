import { Request, Response } from "express";
import Event from "../../../models/Event";
import Registration from "../../../models/Registration";
import sendResponse from "../../../utils/response";
import User  from "../../../models/User";
import mongoose from "mongoose";

export const createEvent = async (req: Request, res: Response) => {
  const {
    eventName,
    organizer,
    details,
    titlePicture,
    pictures,
    topic,
    categories,
    eventStartDateTime,
    eventEndDateTime,
    isPaidEvent,
    price,
  } = req.body;

  if (
    !eventName ||
    !organizer ||
    !details ||
    !topic ||
    !categories ||
    !eventStartDateTime ||
    !eventEndDateTime
  ) {
    return sendResponse(res, 400, {
      success: false,
      message: "Missing required fields",
    });
  }

  if (isPaidEvent && (price === undefined || price < 0)) {
    return sendResponse(res, 400, {
      success: false,
      message: "Invalid price for paid event",
    });
  }

  try {
    const existingUser = await User.findById(organizer);
    if (!existingUser) {
      return sendResponse(res, 404, {
        success: false,
        message: "Organizer not found",
      });
    }

    const existingEvent = await Event.findOne({ eventName, organizer });
    if (existingEvent) {
      return sendResponse(res, 400, {
        success: false,
        message: "An event with the same name and organizer already exists",
      });
    }

    const newEvent = new Event({
      eventName,
      organizer,
      details,
      titlePicture,
      pictures,
      topic,
      categories,
      eventStartDateTime,
      eventEndDateTime,
      isActive: true,
      isPaidEvent,
      price,
    });

    await newEvent.save();

    return sendResponse(res, 200, {
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Server error while creating event",
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { eventId } = req.query;
  const {
    eventName,
    details,
    titlePicture,
    pictures,
    topic,
    categories,
    eventStartDateTime,
    eventEndDateTime,
    isPaidEvent,
    price,
  } = req.body;

  if (!eventId) {
    return sendResponse(res, 400, {
      success: false,
      message: "Event ID is required",
    });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return sendResponse(res, 404, {
        success: false,
        message: "Event not found",
      });
    }

    event.eventName = eventName || event.eventName;
    event.details = details || event.details;
    event.titlePicture = titlePicture || event.titlePicture;
    event.pictures = pictures || event.pictures;
    event.topic = topic || event.topic;
    event.categories = categories || event.categories;
    event.eventStartDateTime = eventStartDateTime || event.eventStartDateTime;
    event.eventEndDateTime = eventEndDateTime || event.eventEndDateTime;
    event.isPaidEvent =
      isPaidEvent !== undefined ? isPaidEvent : event.isPaidEvent;
    event.price = price !== undefined ? price : event.price;

    await event.save();

    return sendResponse(res, 200, {
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Update Event Error:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Server error while updating event",
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.query;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return sendResponse(res, 404, {
        success: false,
        message: "Event not found",
      });
    }

    return sendResponse(res, 200, {
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Server error while deleting the event",
    });
  }
};

export const getEventsByOrganizer = async (req: Request, res: Response) => {
  const organizerId = req.params.organizerId;

  if (!organizerId) {
    return sendResponse(res, 400, {
      success: false,
      message: "Organizer ID is required",
    });
  }

  try {
    const events = await Event.find({ organizer: organizerId });

    if (events.length === 0) {
      return sendResponse(res, 200, {
        success: true,
        message: "No events found for the specified organizer",
        data: []
      });
    }

    return sendResponse(res, 200, {
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Server error while retrieving events",
    });
  }
};

export const getEventsExcludingOrganizer = async (req: Request, res: Response) => {
  const loggedInUserId = req.params.organizerId;
  if (!loggedInUserId || !mongoose.Types.ObjectId.isValid(loggedInUserId)) {
    return sendResponse(res, 400, {
      success: false,
      message: "A valid logged-in user ID is required",
    });
  }

  try {
    const events = await Event.find({
      organizer: { $ne: new mongoose.Types.ObjectId(loggedInUserId) },
      isActive: true,
    });

    return sendResponse(res, 200, {
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Server error while retrieving events",
    });
  }
};

export const getEventsRegisteredByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return sendResponse(res, 400, {
      success: false,
      message: "A valid logged-in user ID is required",
    });
  }

  try {
    const events = await Registration.find({
      user:new mongoose.Types.ObjectId(userId),
    }).populate('event');

    return sendResponse(res, 200, {
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Server error while retrieving events",
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const EventbyId = await Event.findById(eventId);

    if (!EventbyId) {
      return sendResponse(res, 404, {
        success: false,
        message: "Event not found",
      });
    }

    return sendResponse(res, 200, {
      success: true,
      message: "Event retrieved successfully",
      data: EventbyId,
    });
  } catch (error) {
    console.error("Get Event Error:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Server error while getting the event",
    });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    return sendResponse(res, 200, {
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error("Error retrieving all events:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Server error while retrieving all events",
    });
  }
};