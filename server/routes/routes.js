import {Test, Private} from "../models/models";
const path = require("path");
const fs = require("fs");
import {verify, signin, createuser} from "../helpers/auth";

export const routes = (app) => {
    app.get("/", async (req,res) => {
        const data = await Test.find().lean();
        console.log("recieved request!");
        res.render("pages/index", {
            tests: data,
        });
    });
    app.get("/private", verify, async (req,res) => {
        const data = await Private.find().lean();
        console.log("recieved request!");
        res.render("pages/private", {
            tests: data,
        });
    });
    app.post("/testup", verify, async (req,res) => {
        console.log(req.body);
        await Test.create({value:req.body.st});
        res.redirect("/");
    });
    app.post("/fileup", verify, async (req, res) => {
        console.log(req.files.file.name);
        fs.rename(req.files.file.tempFilePath,path.join("tmp",req.files.file.name), ()=>{});
        await Test.create({value:req.files.file.name,link:path.join("files",req.files.file.name)});
        res.redirect("/");
    })
    app.post("/privatetestup", verify, async (req,res) => {
        console.log(req.body);
        await Private.create({value:req.body.st});
        res.redirect("/private");
    });
    app.post("/privatefileup", verify, async (req, res) => {
        console.log(req.files.file.name);
        fs.rename(req.files.file.tempFilePath,path.join("privatetmp",req.files.file.name), ()=>{});
        await Private.create({value:req.files.file.name,link:path.join("privatefiles",req.files.file.name)});
        res.redirect("/private");
    })
    app.get("/loginpage", async (req, res) => {
        res.render("pages/login");
    })
    app.post("/login", async (req, res) => {
        await signin(req, res);
    })
    app.post("/createuser", async (req, res) => {
        createuser(req.body.username, req.body.password);
        res.redirect("/");
    })
    app.get("/basic", (req, res) => {
        res.sendFile(path.join(__dirname,"../../index.html"));
    })
}

export default routes;