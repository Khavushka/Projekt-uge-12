'use strict';
const User = require("./usersschema");
const bcrypt = require('bcryptjs'); 
const session = require('express-session');
const mongoose = require('mongoose');
const { compileClientWithDependenciesTracked } = require("pug");
const dbName = "todo";
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};


// const UFILE = __dirname + '/../data/users.json';

exports.getLogin = async function (req) {
	await mongoose.connect(CONSTR, CONPARAM);
	const db = mongoose.connection;
	db.once("open", function() {
		console.log("connected to server by mongoose")
	});
	
	let success = false;

    try {
		console.log(User);
		let users = await User.find({
			email: req.body.email
		},null,{});
		console.log(users); 
		let user = users[0]; //find returnerer array, derfor bruger vi et index

		console.log(`abc: ${user}`);
		

			success = await bcrypt.compare(req.body.password, user.password);
			if (user.role === "unverified") {
			return !success; // Hvis bruger er unverified = forhindrer login
			} else if (success) {
				req.session.authenticated = true;
				req.session.role = user.role;
				req.session.email = user.email;
				console.log(req.session.role);
			} else {
				req.session.destroy(); //Kan bruges til logout
			}
			return success;	

    }catch(e) {
		console.log(e.message);
	} db.close();
}