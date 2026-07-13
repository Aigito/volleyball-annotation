import "dotenv/config";
import express from "express";
import connectDB from "./db.js";
import { connect } from "mongoose";

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
