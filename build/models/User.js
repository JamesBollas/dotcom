"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var UserSchema = new _mongoose.Schema({
  name: String,
  salt: String,
  hash: String
});

var User = _mongoose["default"].model("users", UserSchema);

module.exports = User;
//# sourceMappingURL=User.js.map