import mongoose, { Schema } from "mongoose";

const TestSchema = new Schema({
  value: String,
  link: String,
  uploader: { type: Schema.Types.ObjectId, ref: "users" },
});

const Test = mongoose.model("tests", TestSchema);

module.exports = Test;
