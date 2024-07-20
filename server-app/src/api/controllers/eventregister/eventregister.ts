/**
 * Author: Aharnish Solanki (B00933563)
 */

import { Request, Response } from "express";
import User from "../../../models/User";
import Event from "../../../models/Event";
import Registration from "../../../models/Registration";
import sendResponse from "../../../utils/response";

export const createEventRegistration = async (req: Request, res: Response) => {
    const { userId, eventId, participants } = req.body;

    if (!userId || !eventId) {
      return sendResponse(res, 400, {
        success: false,
        message: "User ID and Event ID are required",
      });
    }

    try {

      const registration = new Registration({
        user: userId,
        event: eventId,
        participants: participants,
        status: "PENDING",
        registrationDate: new Date(),
        paymentStatus: "PENDING", 
        amountPaid: 0, 
      });

      await registration.save();

      return sendResponse(res, 200, {
        success: true,
        message: "Registration successful",
        data: registration,
      });
    } catch (error) {
      console.error("Registration Error:", error);
      return sendResponse(res, 500, {
        success: false,
        message: "Server error while registering for the event",
      });
    }
  };

  export const deleteEventRegistration = async (req: Request, res: Response) => {
    const { registrationId } = req.params;

    if (!registrationId) {
      return sendResponse(res, 400, {
        success: false,
        message: "Registration ID is required",
      });
    }

    try {
      const registration = await Registration.findByIdAndDelete(registrationId);

      if (!registration) {
        return sendResponse(res, 404, {
          success: false,
          message: "Registration not found",
        });
      }

      return sendResponse(res, 201, {
        success: true,
        message: "Registration deleted successfully",
        data: registration,
      });
    } catch (error) {
      console.error("Delete Registration Error:", error);
      return sendResponse(res, 500, {
        success: false,
        message: "Server error while deleting the registration",
      });
    }
  };

  export const getParticipatoryEvents = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return sendResponse(res, 404, { success: false, message: 'User not found' });
        }

        const query = {
            participants: {
                $elemMatch: { email: user.email }
            }
        };
        const registrations = await Registration.find(query).exec();


        const eventIds = registrations.map(registration => registration.event);
        const events = await Event.find({ '_id': { $in: eventIds } });

        return sendResponse(res, 200, {
            success: true,
            message: 'Participatory events fetched successfully',
            data: events
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: 'Internal server error while fetching participatory events'
        });
    }
};
