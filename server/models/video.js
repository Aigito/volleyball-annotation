import mongoose from "mongoose";
import userSchema from "./user.js";
const { Schema } = mongoose;
const User = mongoose.model("User", userSchema);

const videoSchema = new Schema({
  user: { type: mongoose.ObjectId, ref: User },
  url: String,
  title: String,
});

export default videoSchema;
