import express from "express";
import mongoose from "mongoose";
import videoSchema from "../models/video.js";
import userSchema from "../models/user.js";
const videoRouter = express.Router();
const Video = mongoose.model("Video", videoSchema);
const User = mongoose.model("User", userSchema);

// Todo: Need to filter videos based on user
// Todo: Need to implement index video route

videoRouter.get("/videos", async (req, res) => {
  const videos = await Video.find();
  res.send(videos);
});

// Todo: Grab the correct user that is currently logged in

videoRouter.post("/videos", async (req, res) => {
  const { url, title } = req.body;
  const user = await User.findOne();
  const video = new Video({ user, url, title });
  try {
    await video.save();
    res.send("Video successfully saved");
  } catch (e) {
    res.status(500).send(e.message);
    console.error("Could not save video", e.message);
  }
});

export default videoRouter;
