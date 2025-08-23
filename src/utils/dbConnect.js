import mongoose from "mongoose";
import { MONGODB_URL } from "./config.js";

const dbConnect = async () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
export default dbConnect;
