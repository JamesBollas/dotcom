"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var TestSchema = new _mongoose.Schema({
  value: String,
  link: String
});

var Test = _mongoose["default"].model("tests", TestSchema);

module.exports = Test;
//# sourceMappingURL=Test.js.map