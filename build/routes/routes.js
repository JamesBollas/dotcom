"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.routes = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models/models");

var _auth = require("../helpers/auth");

var path = require("path");

var fs = require("fs");

var routes = function routes(app) {
  app.get("/", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _models.Test.find().lean();

            case 2:
              data = _context.sent;
              console.log("recieved request!");
              res.render("pages/index", {
                tests: data
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  app.get("/private", _auth.verify, /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _models.Private.find().lean();

            case 2:
              data = _context2.sent;
              console.log("recieved request!");
              res.render("pages/private", {
                tests: data
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  app.post("/testup", _auth.verify, /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(req.body);
              _context3.next = 3;
              return _models.Test.create({
                value: req.body.st
              });

            case 3:
              res.redirect("/");

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  app.post("/fileup", _auth.verify, /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log(req.files.file.name);
              fs.rename(req.files.file.tempFilePath, path.join("tmp", req.files.file.name), function () {});
              _context4.next = 4;
              return _models.Test.create({
                value: req.files.file.name,
                link: path.join("files", req.files.file.name)
              });

            case 4:
              res.redirect("/");

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
  app.post("/privatetestup", _auth.verify, /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log(req.body);
              _context5.next = 3;
              return _models.Private.create({
                value: req.body.st
              });

            case 3:
              res.redirect("/private");

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
  app.post("/privatefileup", _auth.verify, /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              console.log(req.files.file.name);
              fs.rename(req.files.file.tempFilePath, path.join("privatetmp", req.files.file.name), function () {});
              _context6.next = 4;
              return _models.Private.create({
                value: req.files.file.name,
                link: path.join("privatefiles", req.files.file.name)
              });

            case 4:
              res.redirect("/private");

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
  app.get("/loginpage", /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              res.render("pages/login");

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
  app.post("/login", /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _auth.signin)(req, res);

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
  app.post("/createuser", /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              (0, _auth.createuser)(req.body.username, req.body.password);
              res.redirect("/");

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
  app.get("/basic", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
  });
};

exports.routes = routes;
var _default = routes;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map