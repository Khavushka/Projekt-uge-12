'use strict';

const User = require("./usersschema");
const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose');

const dbName = "todo";
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};

exports.getUsers = async function (que, sort) {
    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
    console.log("connected to server by mongoose")
    });
    
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        // await er asynkront og venter, til den får info
        let users = await User.find({
            role: "unverified"}, null,{});  // await er asynkront og venter, til den får info
        return users;
    } catch (e) {
        console.log(e);
    } db.close();
}

exports.postUsers = async function (req) { // Register users

    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });

    let user = new User({                     // create object in db-format
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        role: "unverified"
    });
    let pwd = await bcrypt.hash(req.body.password, 10);
    //console.log(pwd);
    user.password = pwd;
    //console.log(req.body.password);
    User.create(user, function(error, savedDocument) { //create er en mongoose funktion
    if (error) {
        console.log(error);
        } db.close();
    });
}

// approve users
exports.postApproveUsers = async function (req) { // Register users

    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });

    if (req.body.userrole = "delete") { // If unverified, delete user
    User.deleteOne({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        role: req.body.userrole});         // create object in db-format
    
    } else if(req.body.userrole = "verify") {
    User.updateOne({role: "verified", email:req.body.email});

    } else if(req.body.userrole = "admin") {
    User.updateOne({role: "admin", email:req.body.email});
    }
    console.log(req.body);
    console.log(User.role);
    //console.log(req.body.password);
    // if (error) {
    //     console.log(error);
    //     } 
        db.close();
}