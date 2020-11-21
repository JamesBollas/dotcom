"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var LOCAL = "mongodb://localhost:27017";

var connect = function connect(callback) {
  _mongoose["default"].connect("".concat(LOCAL, "/james_dotcom"), {
    useNewUrlParser: true
  });

  _mongoose["default"].connection.once("open", function () {
    console.log("connected to local db!");
    return callback();
  }).on("error", function (error) {
    console.log("db error:");
    console.log(error);
  });
};

exports.connect = connect;
//# sourceMappingURL=db.js.map