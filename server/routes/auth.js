import express from "express";
const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  res.send("Logged in");
});

authRouter.post("/logout", (req, res) => {
  res.send("Logged out");
});

export default authRouter;
