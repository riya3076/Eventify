/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  eventName: string;
  organizer: mongoose.Schema.Types.ObjectId;
  titlePicture: string;
  pictures?: string[];
  topic: string;
  categories: string[];
  eventStartDateTime: Date;
  eventEndDateTime: Date;
  isActive: boolean;
  isPaidEvent: boolean;
  price?: number;
  details: {
    description: string;
    venue?: string;
    link?: string;
    additionalInfo?: string;
  };
}

const eventSchema: Schema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    details: {
      description: { type: String, required: true },
      venue: { type: String },
      link: { type: String },
      additionalInfo: { type: String },
    },
    titlePicture: {
      type: String,
      required: true,
    },
    pictures: [String],
    topic: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    eventStartDateTime: {
      type: Date,
      required: true,
    },
    eventEndDateTime: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPaidEvent: {
      type: Boolean,
      required: true,
      default: false,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model<IEvent>('events', eventSchema);

export default Event;
