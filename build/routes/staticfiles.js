"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.statics = void 0;

var _auth = require("../helpers/auth");

var path = require("path");

var statics = function statics(app) {
  app.get("/files/:file", function (req, res) {
    res.sendFile(path.join(__dirname, "../../tmp/", req.params.file));
  });
  app.get("/privatefiles/:file", _auth.verify, function (req, res) {
    res.sendFile(path.join(__dirname, "../../privatetmp/", req.params.file));
  });
};

exports.statics = statics;
var _default = statics;
exports["default"] = _default;
//# sourceMappingURL=staticfiles.js.map