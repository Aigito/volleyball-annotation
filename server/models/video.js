import mongoose from "mongoose";
const { Schema } = mongoose;

const videoSchema = new Schema({
  url: String,
  title: String,
});

export default videoSchema;
