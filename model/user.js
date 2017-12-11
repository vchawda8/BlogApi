/**
 * @author Vishal Chawda
 *
 * this file will be responsible to perform crud operations on the schema
 */

//require 3rd party modules or inbuilt once
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

//require user schema
const User = require('./../schema/userSchema');
var registerUser = (user) => {
	var newPassword = encryptPassword(user.password);
	user.password = newPassword;
	return new Promise((resolve, reject) => {
		var newUser = new User(user);
		newUser.save()
			.then((result) => {
				var token = getToken(result._id);
				resolve({
					_id: result._id,
					fullName: result.fullName,
					token
				});
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
					var token = getToken(result._id);
					resolve({
						_id: result._id,
						fullName: result.fullName,
						token
					});
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

var getToken = (userId) => {
	return Jwt.sign({
		id: userId,
		access: 'auth'
	}, 'abc123');
	return User.findById({
		userId
	}).then((result) => {
		result.tokens.push({
			token,
			access: 'auth'
		});
		result.save().then((data) => {
			return token;
		});
	});
}

module.exports = {
	registerUser,
	loginUser
};