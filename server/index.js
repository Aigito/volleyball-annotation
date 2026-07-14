import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import { connect } from "mongoose";
import videoSchema from "./models/video.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Worlds");
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

const Video = mongoose.model("Video", videoSchema);
const test = new Video({ url: "youtube.com", title: "sunday kensi sesh" });
await test.save();
