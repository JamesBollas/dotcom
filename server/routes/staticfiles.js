import {verify} from "../helpers/auth";
const path = require("path");

export const statics = (app) => {
    app.get("/files/:file", (req, res) => {
        res.sendFile(path.join(__dirname,"../../tmp/",req.params.file));
    })
    app.get("/privatefiles/:file", verify, (req, res) => {
        res.sendFile(path.join(__dirname,"../../privatetmp/",req.params.file));
    })
}

export default statics;