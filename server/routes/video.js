import express from "express";
import videoSchema from "../models/video.js";
import mongoose from "mongoose";
const videoRouter = express.Router();
const Video = mongoose.model("Video", videoSchema);

videoRouter.get("/videos", async (req, res) => {
  const videos = await Video.find();
  res.send(videos);
});

videoRouter.post("/videos", async (req, res) => {
  const { url, title } = req.body;
  const video = new Video({ url, title });
  try {
    await video.save();
    res.send("Video successfully saved");
  } catch (e) {
    console.error("Could not save video", e.message);
  }
});

export default videoRouter;
