/**
 * Author: Parth Mehta
 * Banner ID: B00931931
 */
import express from "express";
import badgeController from '../../controllers/badge/index';

const router = express.Router();

router.get('/generate/:userId', badgeController.generateBadge);

export default router;
