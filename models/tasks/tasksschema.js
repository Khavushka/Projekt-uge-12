'use strict';

const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
     title: String,
     description: String,
     expires: Date,
     pid: String,
     priority: String,
     status: String
 })
 
 module.exports = mongoose.model("Tasks", tasksSchema, 'tasks');