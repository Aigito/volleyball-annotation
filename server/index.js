import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import { connect } from "mongoose";
import videoSchema from "./models/video.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const Video = mongoose.model("Video", videoSchema);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worlds");
});

app.get("/videos", async (req, res) => {
  const videos = await Video.find();
  res.send(videos);
});

app.post("/videos", async (req, res) => {
  const { url, title } = req.body;
  const video = new Video({ url, title });
  try {
    await video.save();
    res.send("Video successfully saved");
  } catch (e) {
    console.error("Could not save video", e.message);
  }
});

async function start() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Listening on port ${3000}`);
    });
  } catch (e) {
    console.error("Something went wrong", e.message);
  }
}

start();
