/**
 * @author Vishal Chawda
 *@description controller for user related actions register, login, logout
 */

//require user model
const User = require('./../model/user');

/**
 * @description validating and registering a new user fom object
 * @param {object} user object
 * @param {object} reply object
 *
 * @returns reply object with as response to the api called
 */
var register = async(user, reply) => {
	let result;
	try {
		result = await User.registerUser(user);
		return reply.response({
			user: {
				id      : result._id,
				fullName: result.fullName
			}
		}).header('x-auth', result.token);
	} catch (error) {
		return reply.response({
			error: error.message
		}).code(422);
	}
};

/**
 * @description checking if a user exist and log them in if password matches
 *
 * @param {object} user
 * @param {object} reply
 *
 * @returns reply object with as response to the api called with a token set in header
 */
var login = async(user, reply) => {
	let result;
	try {
		result = await User.loginUser(user);
		return reply.response({
			user: {
				id      : result._id,
				fullName: result.fullName
			}
		}).header('x-auth', result.token);
	} catch (error) {
		return reply.response({
			error: error
		}).code(401);
	}
};

module.exports = {
	register,
	login
};