import mongoose from "mongoose"

const LOCAL = "mongodb://localhost:27017";

export const connect = (callback) => {
    mongoose.connect(`${LOCAL}/james_dotcom`, { useNewUrlParser: true });
    mongoose.connection
      .once("open", () => {
        console.log("connected to local db!")
        return callback();
      })
      .on("error", (error) => {
        console.log("db error:");
        console.log(error);
      });
}