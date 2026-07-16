import express from "express";
import mongoose from "mongoose";
import userSchema from "../models/user.js";
const authRouter = express.Router();
const User = new mongoose.model("User", userSchema);

// Todo: Requires email / login name and password as well
// Todo: Encrypt password
// Todo: Somehow ensure that req.body always includes an email and password? Form validation?

authRouter.post("/login", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) throw new Error("Name is required");

    const user = await User.findOne({ name });

    if (!user) res.send("No user found");

    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
    console.error("Something went wrong", e.message);
  }
});

// Todo: Implement actual log out functionality

authRouter.post("/logout", (req, res) => {
  res.send("Logged out");
});

export default authRouter;
