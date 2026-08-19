import mongoose from "mongoose";
import videoSchema from "./video.js";
const { Schema } = mongoose;
const Video = mongoose.model("Video", videoSchema);

const annotationSchema = new Schema({
  videoId: { type: mongoose.ObjectId, ref: Video },
  timestamp: mongoose.Mixed, // TODO: Save as a number, to be fixed
  comment: String,
  canvasDrawing: mongoose.Mixed,
});

export default annotationSchema;
