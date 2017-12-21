/**
 * @author Vishal Chawda
 *
 * @description CRUD operations for User schema
 */

//require 3rd party modules or inbuilt once
const bcrypt   = require('bcrypt')
const Jwt      = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

//require user schema
const User = require('./../schema/user')

/**
 * @description Registers new user object
 *
 * @param 	{object} user - {fullName:string, email:string, password:string, optional others}
 *
 * @returns {object} registered user with UID and token or an error
 */
var registerUser = async(user) => {

	let result
	let passwd
	let newUser
	let token

	try {

		newUser          = new User(user)
		newUser.password = await encryptPassword(user.password)
		result           = await newUser.save()

	} catch (error) {

		throw error;

	}

	return {
		"_id"     : result._id,
		"fullName": result.fullName
	}

}

/**
 * @description login existing user by verifying email and password
 *
 * @param {object} user - {email:string, password:string}
 *
 * @returns {object}	user on successful login or an error
 */
var loginUser = async(user) => {

	let result
	let token
	let passwordTest

	result = await User.findOne({
		email: user.email
	})

	passwordTest = await bcrypt.compare(user.password, result.password)

	if (result !== null && passwordTest) {

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

}

/**
 * @function logoutUser
 *
 * @description logs out a user by removing the token sent by the user via the api
 *
 * @param {string} token - token: string
 *
 *@returns {object} will return success or error based on the termination of request
 */
var logoutUser = async(token) => {

	let result = await User.update({
		$pull: {
			tokens: {
				token
			}
		}
	})

	if (result.nModified > 0) {
		return ({
			success: "token removed"
		})
	} else {
		throw ({
			error: "could not logout"
		})
	}

}

/**
 * @function encryptPassword
 *
 * @description will return an encrypted password used while storing user data
 *
 * @param {String} password - password: string
 *
 * @returns {String} passwordHash
 */
var encryptPassword = async(password) => {

	let salt         = await bcrypt.genSalt(10)
	let passwordHash = await bcrypt.hash(password, salt)

	return passwordHash

}

/**
 * @function getToken
 *
 * @description will generate a token by encrypting an object
 *
 * @param {String} userId - _id: string
 *
 * @returns {String} token - token: string(encrypted with signature)
 */
var getToken = async(userId) => {

	let token, result;

	result = await User.findById({
		_id: userId
	})

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

/**
 * @function findByToken
 *
 * @description will fetch a user from collection ad return
 *
 * @param {string} token token-string
 *
 * @returns {Object} user
 */
var findByToken = async(token) => {
	try {
		user = await User.findOne({
			"tokens.token": token
		})
		return user
	} catch (error) {
		throw error
	}

}

var findById = async(userId) => {

	return await User.findById(userId)

}

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	getToken,
	findByToken,
	findById
};