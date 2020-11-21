"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createuser = exports.signin = exports.verify = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models/models");

var crypto = require("crypto");

var jwt = require("jsonwebtoken");

var jwtKey = "snklvhahvnuklse";
var jwtExpiry = 864000;

var verify = function verify(req, res, next) {
  var token = req.cookies.token;
  console.log(token);

  if (!token) {
    res.redirect("/loginpage");
  }

  var payload;

  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }

    return res.status(400).end();
  }

  next();
};

exports.verify = verify;

var signin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var name, password, user, hash, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = req.body.username;
            password = req.body.password;

            if (!name || !password) {
              res.status(401).end();
            }

            _context.next = 5;
            return _models.User.findOne({
              name: name
            }).lean();

          case 5:
            user = _context.sent;

            if (!(user == null || user == undefined || user == {})) {
              _context.next = 9;
              break;
            }

            res.status(401).end();
            return _context.abrupt("return");

          case 9:
            console.log(user);
            console.log(user.salt);
            console.log(password);
            console.log(name);
            hash = crypto.createHash("sha256").update(password).update(user.salt).digest("hex");
            console.log(hash);
            console.log(user.hash);

            if (hash == user.hash) {
              token = jwt.sign({
                name: name
              }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpiry
              });
              res.cookie("token", token, {
                maxAge: jwtExpiry * 1000
              }).redirect("/");
            }

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signin = signin;

var createuser = function createuser(name, password) {
  var buf = crypto.randomBytes(256);
  var salt = buf.toString("hex");
  var hash = crypto.createHash("sha256").update(password).update(salt).digest("hex");

  _models.User.create({
    name: name,
    salt: salt,
    hash: hash
  });
};

exports.createuser = createuser;
//# sourceMappingURL=auth.js.map