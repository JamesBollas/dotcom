import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  salt: String,
  hash: String,
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
