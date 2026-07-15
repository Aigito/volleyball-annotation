import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export default userSchema;
