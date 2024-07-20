/**
 * Author: Parth Mehta
 * Banner ID: B00931931
 */
import { Request, Response } from 'express';
import { generateBadgeForUser } from '../../services/badge';
import sendResponse from '../../../utils/response';

export const generateBadge = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
        return sendResponse(res, 400, { success: false, message: 'User ID is required' });
    }

    try {
        const badge = await generateBadgeForUser(userId);
        if (badge) {
            return sendResponse(res, 200, { success: true, message: 'Badge generated successfully', data: badge });
        } else {
            return sendResponse(res, 200, { success: false, message: 'No badge generated. User might already have the highest badge or not meet the criteria yet.' });
        }
    } catch (error) {
        return sendResponse(res, 500, { success: false, message: 'Internal server error while generating badge' });
    }
};
