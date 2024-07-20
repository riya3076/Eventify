/**
 * Author: Riyaben Pareshkumar Patel (B00926204)
 */

import mongoose, { Schema, Document } from 'mongoose';

interface IWishlist extends Document {
  user: mongoose.Schema.Types.ObjectId;
  events: mongoose.Schema.Types.ObjectId[];
}

const wishlistSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
});

const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);

export default Wishlist;