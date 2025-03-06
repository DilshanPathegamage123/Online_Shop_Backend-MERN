import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "Default";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting to the database.", error);
    process.exit(1);
  }
};
