import mongoose, { Schema } from "mongoose";

const PrivateSchema = new Schema({
  value: String,
  link: String,
});

const Private = mongoose.model("private", PrivateSchema);

module.exports = Private;
