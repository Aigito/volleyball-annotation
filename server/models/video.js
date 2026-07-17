import mongoose from "mongoose";
import userSchema from "./user.js";
const { Schema } = mongoose;
const User = mongoose.model("User", userSchema);

// Todo: Think of what other fields to have, upload timestamp, upload author, duration

const videoSchema = new Schema({
  user: { type: mongoose.ObjectId, ref: User },
  url: String,
  title: String,
});

export default videoSchema;
