"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var PrivateSchema = new _mongoose.Schema({
  value: String,
  link: String
});

var Private = _mongoose["default"].model("private", PrivateSchema);

module.exports = Private;
//# sourceMappingURL=PrivateData.js.map