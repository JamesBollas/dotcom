import {User} from "../models/models";
const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const jwtKey = "snklvhahvnuklse";
const jwtExpiry = 864000

export const verify = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token){
        res.redirect("/loginpage");
    }
    var payload
    try{
        payload = jwt.verify(token,jwtKey);
    }
    catch(e){
        if (e instanceof jwt.JsonWebTokenError){
            return res.status(401).end();
        }
        return res.status(400).end();
    }
    next();
}

export const user_details = (token) => {
    var payload;
    try{
        payload = jwt.verify(token, jwtKey);
        return payload;
    }
    catch(e){
        if (e instanceof jwt.JsonWebTokenError){
            return "no token";
        }
        return "bad token?";
    }
}

export const signin = async (req, res) => {
    const name = req.body.username;
    const password = req.body.password;
    if(!name || !password){
        res.status(401).end();
    }
    const user = await User.findOne({name}).lean();
    if(user == null || user == undefined || user == {}){
        res.status(401).end();
        return;
    }
    console.log(user);
    console.log(user.salt);
    console.log(password);
    console.log(name);
    const hash = crypto.createHash("sha256").update(password).update(user.salt).digest("hex");
    console.log(hash);
    console.log(user.hash);
    if(hash == user.hash){
        const token = jwt.sign({name},jwtKey,{
            algorithm: "HS256",
            expiresIn: jwtExpiry,
        })
        res.cookie("token",token, {maxAge: jwtExpiry*1000}).redirect("/");
    }
}

export const createuser = async (name, password) => {
    const buf = crypto.randomBytes(256);
    const salt = buf.toString("hex");
    const hash = crypto.createHash("sha256").update(password).update(salt).digest("hex");
    User.create({name, salt, hash});
}