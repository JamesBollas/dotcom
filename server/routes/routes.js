import {Test, Private, User} from "../models/models";
const path = require("path");
const fs = require("fs");
import {verify, signin, createuser, user_details} from "../helpers/auth";

export const routes = (app) => {
    app.get("/", async (req,res) => {
        const data = await Test.find().lean();
        console.log("recieved request!");
        const user = user_details(req.cookies.token);
        const user_db = await User.findOne({name:user.name}).lean();
        console.log(user_db._id);
        res.render("pages/index", {
            tests: data,
            user,
            user_db,
        });
    });
    app.get("/private", verify, async (req,res) => {
        const data = await Private.find().lean();
        console.log("recieved request!");
        const user = user_details(req.cookies.token);
        const user_db = await User.findOne({name:user.name}).lean();
        console.log(user);
        res.render("pages/private", {
            tests: data,
            user,
            user_db,
        });
    });
    app.post("/testup", verify, async (req,res) => {
        console.log(req.body);
        const user = await User.findOne({name:user_details(req.cookies.token).name}).lean();
        console.log(user);
        Test.create({value:req.body.st, uploader:user._id});
        res.redirect("/");
    });
    app.post("/fileup", verify, async (req, res) => {
        console.log(req.files.file.name);
        fs.rename(req.files.file.tempFilePath,path.join("tmp",req.files.file.name), ()=>{});
        const user = await User.findOne({name:user_details(req.cookies.token).name}).lean();
        Test.create({value:req.files.file.name,link:path.join("files",req.files.file.name), uploader:user._id});
        res.redirect("/");
    })
    app.post("/privatetestup", verify, async (req,res) => {
        console.log(req.body);
        const user = await User.findOne({name:user_details(req.cookies.token).name}).lean();
        Private.create({value:req.body.st, uploader:user._id});
        res.redirect("/private");
    });
    app.post("/privatefileup", verify, async (req, res) => {
        console.log(req.files.file.name);
        fs.rename(req.files.file.tempFilePath,path.join("privatetmp",req.files.file.name), ()=>{});
        const user = await User.findOne({name:user_details(req.cookies.token).name}).lean();
        Private.create({value:req.files.file.name,link:path.join("privatefiles",req.files.file.name), uploader:user._id});
        res.redirect("/private");
    })
    app.get("/loginpage", async (req, res) => {
        res.render("pages/login");
    })
    app.post("/login", async (req, res) => {
        await signin(req, res);
    })
    app.get("/logout", (req, res) => {
        res.clearCookie("token");
        res.redirect("/");    
    })
    app.post("/createuser", verify, async (req, res) => {
        await createuser(req.body.username, req.body.password);
        res.redirect("/");
    })
    app.get("/basic", (req, res) => {
        res.sendFile(path.join(__dirname,"../../index.html"));
    })
    app.get("/delete/:id", verify, async (req,res) => {
        const user = user_details(req.cookies.token);
        const user_db = await User.findOne({name:user.name}).lean();
        const record = await Test.findOne({_id:req.params.id}).lean();
        if(String(user_db._id) == String(record.uploader)){
            await Test.deleteOne({_id:record._id});
        }
        res.redirect("/");
    })
    app.get("/deleteprivate/:id", verify, async (req,res) => {
        const user = user_details(req.cookies.token);
        const user_db = await User.findOne({name:user.name}).lean();
        const record = await Private.findOne({_id:req.params.id}).lean();
        if(String(user_db._id) == String(record.uploader)){
            await Private.deleteOne({_id:record._id});
        }
        res.redirect("/private");
    })
    
}

export default routes;