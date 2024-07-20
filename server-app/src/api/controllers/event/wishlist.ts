/**
 * Author: Riyaben Pareshkumar Patel (B00926204)
 */

import { Request, Response } from 'express';
import sendResponse from '../../../utils/response';
import Wishlist from '../../../models/Wishlist';
import mongoose from 'mongoose';

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return sendResponse(res, 400, { success: false, message: "Invalid userId or eventId" });
    }

    const update = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { events: eventId } }, 
      { new: true, upsert: true }
    );

    return sendResponse(res, 200, { success: true, data: update });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return sendResponse(res, 500, { success: false, message: "Could not add to wishlist" });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { eventId } = req.body; 

    if (!userId || !eventId) {
      return sendResponse(res, 400, { success: false, message: "Missing userId or eventId" });
    }

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return sendResponse(res, 404, { success: false, message: "Wishlist not found" });
    }

    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { events: eventId } },
      { new: true }
    );

    return sendResponse(res, 200, { success: true, data: updatedWishlist });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return sendResponse(res, 500, { success: false, message: "Could not remove from wishlist" });
  }
};

export const getWishlistEvents = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('events');
    if (!wishlist) {
      return sendResponse(res, 404, { success: false, message: "Wishlist not found" });
    }
    return sendResponse(res, 200, { success: true, data: wishlist.events });
  } catch (error) {
    console.error("Error getting wishlist events:", error);
    return sendResponse(res, 500, { success: false, message: "Could not fetch wishlist events" });
  }
};
