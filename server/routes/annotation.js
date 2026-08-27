import express from "express";
import mongoose from "mongoose";
import annotationSchema from "../models/annotation.js";
const annotationRouter = express.Router();
const Annotation = mongoose.model("Annotation", annotationSchema);

annotationRouter.get("/annotations", async (req, res) => {
  const annotations = await Annotation.find();
  res.send(annotations);
});

annotationRouter.post("/annotations", async (req, res) => {
  try {
    const { timestamp, canvasDrawing } = req.body;

    const annotation = new Annotation({ timestamp, canvasDrawing });

    await annotation.save();
    res.status(201).json({ message: "Annotation saved", annotation });
  } catch (error) {
    console.error("Error saving annotation: ", error.message);
    res.status(500).json({ mesasge: "Failed to save annotation" });
  }
});

export default annotationRouter;
