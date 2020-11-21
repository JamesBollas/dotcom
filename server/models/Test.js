import mongoose, { Schema } from "mongoose";

const TestSchema = new Schema({
  value: String,
  link: String,
});

const Test = mongoose.model("tests", TestSchema);

module.exports = Test;
