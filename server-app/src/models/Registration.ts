/**
 * Authors: Keyur Pradipbhai Khant (Banner ID: B00935171), Aharnish Maheshbhai SOlanki (Banner ID: B00933563) 
 */
import mongoose, { Document, Schema } from "mongoose";

interface IRegistration extends Document {
  user: mongoose.Schema.Types.ObjectId;
  event: mongoose.Schema.Types.ObjectId;
  registrationDate: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED" | "PENDING";
  amountPaid?: number;
  notes?: string;
  participants: [
    {
      firstName: String,
      lastName: String,
      email: String,
    }
  ],
}

const registrationSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PAID", "UNPAID", "REFUNDED", "PENDING"],
      default: "PENDING",
    },
    amountPaid: {
      type: Number,
    },
    notes: {
      type: String,
    },
    participants: [
      {
        firstName: String,
        lastName: String,
        email: String,
      }
    ],
  },
  { timestamps: true }
);

const Registration = mongoose.model<IRegistration>(
  "Registration",
  registrationSchema
);

export default Registration;
