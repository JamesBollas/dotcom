"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _routes = _interopRequireDefault(require("./routes/routes"));

var _staticfiles = _interopRequireDefault(require("./routes/staticfiles"));

var db = _interopRequireWildcard(require("./helpers/db"));

//import verify from "./helpers/auth"
var express = require("express");

var app = express();

var fileupload = require("express-fileupload");

var cookies = require("cookie-parser");

var greenlock = require("greenlock-express");

var path = require("path"); //var http = require("http");
//var https = require("https");
//var fs = require("fs");
//var privatekey = fs.readFileSync("sslcert/server.key", "utf-8");
//var certificate = fs.readFileSync("sslcert/server.crt", "utf-8");
//var credentials = {key: privatekey, cert:certificate};


app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "tmp/"
})); //app.use(express.static('tmp'))
//app.use(verify, express.static(path.join(__dirname,'privatetmp')));

app.use(cookies()); // app.use((req,res) => {
//     console.log(req.headers);
//     res.status(200).end();
// })

var setup = function setup() {
  return new Promise(function (resolve, reject) {
    db.connect(function (err) {
      if (err) return reject(err);
      (0, _routes["default"])(app);
      (0, _staticfiles["default"])(app);
      greenlock.init({
        packageRoot: path.join(__dirname, ".."),
        configDir: ".greenlock.d",
        maintainerEmail: "jbb2170@columbia.edu",
        cluster: true
      }).serve(app);
      resolve();
    });
  });
};

exports.setup = setup;

if (require.main === module) {
  setup();
}
//# sourceMappingURL=index.js.map