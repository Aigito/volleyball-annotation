import express from "express";
const annotationRouter = express.Router();

annotationRouter.get("/annotations", (req, res) => {
  res.send("Annotation saved");
});

export default annotationRouter;
