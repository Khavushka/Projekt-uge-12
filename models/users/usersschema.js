'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   // id: Number,
    password: String,
    cpr: Number,
    currentpenalties: Number,
    email: {type: String, unique: true},
    firstname: String,
    middlename: String,
    lastname: String,
    newsletter: Boolean
})

module.exports = mongoose.model("User", userSchema, 'persons');