import mongoose from "mongoose";
const { Schema } = mongoose;

// Todo: Think of what other fields to have

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export default userSchema;
