/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const options: mongoose.ConnectOptions = {
  autoIndex: true,
};

const username: string | undefined = process.env.MONGODB_USERNAME;
const password: string | undefined = process.env.MONGODB_PASSWORD;
const collectionName: string = "CSCI-5709";

const uri: string = `mongodb+srv://${encodeURIComponent(username!)}:${encodeURIComponent(password!)}@cluster0.ec7zwpk.mongodb.net/${collectionName}`;

async function connect(): Promise<void> {
  try {
    await mongoose.connect(uri, options);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("Unable to connect to MongoDB:", err);
  }
}

export default connect;
