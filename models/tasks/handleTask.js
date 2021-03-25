'use strict';

const Task = require("./tasksschema");
const mongoose = require("mongoose");
const dbName = "todo";
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};



exports.getTask = async function (chk, sort) {
    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });
    try {
        //console.log(req.session.userid);
        let tasks = await Task.find(chk, null,{});  // await er asynkront og venter, til den får info
        if (sort === null)
        sort = {sort: -1};
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
        pid: req.session.userid,                  //skal svare til _id på den bruger der er logget ind
        priority: req.body.status, // starter en nyoprettet task ud som t
        status: "do"
    });
    
    console.log(req.session.userid);
    console.log(task);

    Task.create(task, function(error, savedDocument) { //create er en mongoose funktion
        if (error) {
            console.log(error);
            } db.close();
        });
}

//til at slette tasks

exports.deleteTask = async function (req){
    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });
    console.log(req.params._id);
    const taskId = req.params._id.toString().trim();
    await Task.findByIdAndRemove(taskId)
    .then(function(){console.log("Data deleted");})
    .catch(function(error){console.log(error); 
    })    
    db.close();
}

exports.changeTaskDone = async function (req) {
    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });

    const taskId = req.params._id.toString().trim();
    await Task.findByIdAndUpdate(taskId, {status: "done"})
    .then(function(){console.log("Status changed");})
    .catch(function(error){console.log(error); // Failure
    })
    
    db.close();
}

exports.changeTaskDoing = async function (req) {
    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });

    const taskId = req.params._id.toString().trim();
    await Task.findByIdAndUpdate(taskId, {status: "doing"})
    .then(function(){console.log("Status changed");})
    .catch(function(error){console.log(error); // Failure
    })
    
    db.close();
}
exports.changeTaskDo = async function (req) {
    await mongoose.connect(CONSTR, CONPARAM);
    const db = mongoose.connection;
    db.once("open", function() {
        console.log("connected to server by mongoose")
    });
    const taskId = req.params._id.toString().trim();
    await Task.findByIdAndUpdate(taskId, {status: "do"})
    .then(function(){console.log("Status changed");})
    .catch(function(error){console.log(error); // Failure
    })
    
    db.close();
}