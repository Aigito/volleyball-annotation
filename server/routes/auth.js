import express from "express";
import mongoose from "mongoose";
import userSchema from "../models/user.js";
const authRouter = express.Router();
const User = new mongoose.model("User", userSchema);

// Todo: Encrypt password upon signup
// Todo: Implement signup route

// Todo: Somehow ensure that req.body always includes an email and password? Form validation?

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("Email and password is required");

    const user = await User.findOne({ email, password });

    if (!user) res.send("Incorrect email or password");

    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
    console.error("Something went wrong", e.message);
  }
});

// Todo: Implement actual log out functionality by deleting cookie / session

authRouter.post("/logout", (req, res) => {
  res.send("Logged out");
});

export default authRouter;
