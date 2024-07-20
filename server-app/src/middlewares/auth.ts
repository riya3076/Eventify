/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import sendResponse from "../utils/response";

const authenticateUser = async (req: any, res: any, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return sendResponse(res, 401, {
        success: false,
        message: "No token provided.",
      });
    }

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (err: any, decoded: any) => {
        if (err) {
          return sendResponse(res, 403, {
            success: false,
            message: "Failed to authenticate token.",
          });
        }

        const user = await User.findById(decoded?.id);
        if (!user) {
          return sendResponse(res, 404, {
            success: false,
            message: "User not found.",
          });
        }

        req.user = user;
        next();
      }
    );
  } catch (error) {
    return sendResponse(res, 401, {
      success: false,
      message: "An error occurred during authentication.",
    });
  }
};

const authenticateAdmin = async (req: any, res: any, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return sendResponse(res, 401, {
        success: false,
        message: "No token provided.",
      });
    }

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (err: any, decoded: any) => {
        if (err) {
          return sendResponse(res, 403, {
            success: false,
            message: "Failed to authenticate token.",
          });
        }

        const user = await User.findById(decoded?.id);
        if (!user) {
          return sendResponse(res, 404, {
            success: false,
            message: "User not found.",
          });
        }

        if (user.role !== "ADMIN") {
          return sendResponse(res, 403, {
            success: false,
            message: "Invalid Authorization.",
          });
        }

        req.user = user;
        next();
      }
    );
  } catch (error) {
    return sendResponse(res, 401, {
      success: false,
      message: "An error occurred during authentication.",
    });
  }
};

export { authenticateUser, authenticateAdmin };
