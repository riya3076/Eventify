/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "ADMIN" | "GENERAL";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  profilePicture?: string;
  interests?: string[];
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "GENERAL"],
      default: "GENERAL",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    bio: String,
    profilePicture: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    interests: [String],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("users", userSchema);

export default User;
