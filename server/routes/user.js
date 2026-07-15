import mongoose from "mongoose";
import express from "express";
const userRouter = express.Router();

userRouter.get("/users", (req, res) => {
  res.send("hello");
});

export default userRouter;
