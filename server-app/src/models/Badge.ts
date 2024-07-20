/**
 * Author: Parth Mehta
 * Banner ID: B00931931
 */
import mongoose, { Document, Schema } from "mongoose";

interface IBadge extends Document {
    user: mongoose.Schema.Types.ObjectId;
    badgeType: string;
    createdAt: Date;
}

const badgeSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    badgeType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Badge = mongoose.model<IBadge>("Badge", badgeSchema);

export default Badge;
