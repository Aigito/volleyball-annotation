import mongoose from "mongoose";
import videoSchema from "./video.js";
const { Schema } = mongoose;
const Video = mongoose.model("Video", videoSchema);

const annotationSchema = new Schema({
  videoId: { type: mongoose.ObjectId, ref: Video },
  timestamp: Date,
  comment: String,
  canvasDrawing: Mixed,
});

export default annotationSchema;
