'use strict';

const User = require("./usersschema");
const bcrypt = require('bcryptjs'); 

const dbServer ='localhost';
const dbName = "todo";

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
    let chk = { email: req.body.email };  // check object for existence
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
    try {
        let cs = await mon.upsert("localhost", "todo", User, user, chk); // Tager fat i mongoose db
        return;
    } catch (e) {
        console.log(e);
    }
}