import express from "express";
import mongoose from "mongoose";
import annotationSchema from "../models/annotation.js";
const annotationRouter = express.Router();
const Annotation = mongoose.model("Annotation", annotationSchema);

annotationRouter.get("/annotations", (req, res) => {
  res.send("Annotation saved");
});

annotationRouter.post("/annotations", async (req, res) => {
  const { timestamp, canvasDrawing } = req.body;

  const annotation = new Annotation({ timestamp, canvasDrawing });

  await annotation.save();
});

export default annotationRouter;
