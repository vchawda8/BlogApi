/**
 * @author Vishal Chawda
 * @description CRUD operations for User schema
 */

//require 3rd party modules or inbuilt once
const bcrypt = require('bcrypt')
const Jwt    = require('jsonwebtoken')

//require user schema
const User     = require('./../schema/userSchema')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

/**
 * @description Registers new user object
 * @param 	{object} user
 * @returns {object} registered user with UID and token or an error
 */
var registerUser = async(user) => {
	let result
	let newUser
	let token
	try {
		user.password = await encryptPassword(user.password);
		newUser       = new User(user)
		result        = await newUser.save()
		token         = await getToken(result._id)

		return {
			"_id"     : result._id,
			"fullName": result.fullName,
			"token"   : token
		}
	} catch (error) {
		throw error;
	}
}

/**
 * login existing user by verifying email and password
 * @param {object} user
 * @returns {object}	user on successful login or an error
 */
var loginUser = async(user) => {
	let result
	let token
	try {
		result = await User.findOne({
			email: user.email
		})
		if (bcrypt.compareSync(user.password, result.password)) {
			token = await getToken(result._id)
			return {
				"_id"     : result._id,
				"fullName": result.fullName,
				"token"   : token
			}
		} else {
			throw ({
				error: "username or password do not match"
			})
		}
	} catch (error) {
		throw error
	}
}

var encryptPassword = async(password) => {
	let salt         = await bcrypt.genSalt(10)
	let passwordHash = await bcrypt.hash(password, salt)
	return passwordHash;
}

var getToken = async(userId) => {
	let token, result;
	try {
		result = await User.findById({
			_id: userId
		})
	} catch (error) {
		throw error
	}

	token = Jwt.sign({
		id    : userId,
		access: 'auth'
	}, 'abc123')
	result.tokens.push({
		token,
		access: 'auth'
	})
	saveResult = await result.save()
	return token
}

module.exports = {
	registerUser,
	loginUser
};