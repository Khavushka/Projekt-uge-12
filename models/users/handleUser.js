'use strict';

const User = require("./usersschema");
const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose');

const dbName = "todo";
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};

exports.getUsers = async function (que, sort) {
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let cs = await mon.retrieve(dbServer, dbName, User, que, sort); // await er asynkront og venter, til den får info
        return cs;
    } catch (e) {
        console.log(e);
    }
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
        newsletter: req.body.newsletter        
    });
    let pwd = await bcrypt.hash(req.body.password, 10);
    //console.log(pwd);
    user.password = pwd;
    //console.log(req.body.password);
    User.create(user, function(error, savedDocument) { 
    if (error) {
        console.log(error);
        } db.close();
    });
}