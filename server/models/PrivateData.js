import mongoose, { Schema } from "mongoose";

const PrivateSchema = new Schema({
  value: String,
  link: String,
  uploader: { type: Schema.Types.ObjectId, ref: "users" },
});

const Private = mongoose.model("private", PrivateSchema);

module.exports = Private;
