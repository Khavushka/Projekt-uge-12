'use strict';

const mongoose = require('mongoose');

const sSchema = mongoose.Schema({
    // id: Number,
     taskname: String,
     date: Number,
     month: String,
 })
 
 module.exports = mongoose.model("Tasks", tasksSchema, 'tasks');