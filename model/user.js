/**
 * @author Vishal Chawda
 *
 * this file will be responsible to perform crud operations on the schema
 */

//require 3rd party modules or inbuilt once
const bcrypt = require('bcrypt');

//require user schema
const User = require('./../schema/userSchema');
var registerUser = (user) => {
	var newPassword = encryptPassword(user.password);
	user.password = newPassword;
	return new Promise((resolve, reject) => {
		var newUser = new User(user);
		newUser.save()
			.then((result) => {
				resolve(result);
			})
			.catch((e) => {
				reject(e);
			});
	});
}

var encryptPassword = (password) => {
	var salt = bcrypt.genSaltSync(10);
	var passwordHash = bcrypt.hashSync(password, salt);
	return passwordHash;
}

var loginUser = (user) => {
	return new Promise((resolve, reject) => {
		User.findOne({
				email: user.email
			})
			.then((result) => {
				if (!result) {
					reject({
						error: "no user found"
					});
				}

				if (bcrypt.compareSync(user.password, result.password)) {
					
					resolve(result);
				} else {
					reject({
						error: "username or password do not match"
					});
				}

			})
			.catch((e) => {
				reject(e);
			});
	});
}

module.exports = {
	registerUser,
	loginUser
};