'use strict';

const mon = require("./mongooseWrap");
const User = require("./usersschema");
const bcrypt = require('bcryptjs'); 
const session = require('express-session');
const mongoose = require("mongoose");
const dbName = "";
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};
const dbServer ='localhost';