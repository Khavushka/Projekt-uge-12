'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    password: String,
    email: {type: String, unique: true},
    firstname: String,
    middlename: {type: String, required: false}, //middlename is optional
    lastname: String,
    role: String
})

module.exports = mongoose.model("User", userSchema, 'persons');