import routes from "./routes/routes";
import statics from "./routes/staticfiles";
import * as db from "./helpers/db"
//import verify from "./helpers/auth"
const express = require("express");
const app = express();
var fileupload = require("express-fileupload");
var cookies = require("cookie-parser");
var greenlock = require("greenlock-express");
const path = require("path");

//var http = require("http");
//var https = require("https");
//var fs = require("fs");
//var privatekey = fs.readFileSync("sslcert/server.key", "utf-8");
//var certificate = fs.readFileSync("sslcert/server.crt", "utf-8");
//var credentials = {key: privatekey, cert:certificate};

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(fileupload({useTempFiles: true, tempFileDir: "tmp/"}));
//app.use(express.static('tmp'))
//app.use(verify, express.static(path.join(__dirname,'privatetmp')));
app.use(cookies());

// app.use((req,res) => {
//     console.log(req.headers);
//     res.status(200).end();
// })

export const setup = () => {
    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) return reject(err);

            routes(app);
            statics(app);

            greenlock.init({
                packageRoot: path.join(__dirname,".."),
                configDir: ".greenlock.d",
                maintainerEmail: "jbb2170@columbia.edu",
                cluster: true,
            }).serve(app);
            
            resolve();
        })
    })
}

if (require.main === module) {
    setup();
  }