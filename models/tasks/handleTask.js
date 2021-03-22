'use strict';

const Task = require("./tasksschema");
const mongoose = require("mongoose");
const dbName = "todo";
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};



exports.getTask = async function (que, sort) {
    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let tasks = await Task.find({
            status: "done"}, null,{});  // await er asynkront og venter, til den får info
        return tasks;
    } catch (e) {
        console.log(e);
    } db.close();
}

exports.postTask = async function (req) {
    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });
    let chk = { title: req.body.title };  // check object for existence
    let task = new Task({                     // create object in db-format
        title: req.body.title,
        description: req.body.description,  
        expires: req.body.expires,
        pid: req.body.pid,                  //skal svare til _id på den bruger der er logget ind
        priority: req.body.priority,
        status: req.body.status
    });

    Task.create(task, function(error, savedDocument) { //create er en mongoose funktion
        if (error) {
            console.log(error);
            } db.close();
        });
}