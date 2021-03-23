'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {type: String, unique: true},
    firstname: String,
    middlename: String, //{type: String, required: false}, //middlename is optional
    lastname: String,
    role: {
        type: String,
        enum: ['verified', 'admin', 'unverified'], 
        default: 'unverified'
    }
})

module.exports = mongoose.model("User", userSchema, 'users');