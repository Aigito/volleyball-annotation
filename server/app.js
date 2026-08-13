import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import { connect } from "mongoose";
import videoSchema from "./models/video.js";
import mongoose from "mongoose";
import videoRouter from "./routes/video.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import annotationRouter from "./routes/annotation.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", videoRouter, userRouter, authRouter, annotationRouter);

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
