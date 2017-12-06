/**
 * @author Vishal Chawda
 *
 * controller for user related actions
 * register
 * login
 * logout
 */

//require user model
const User = require('./../model/user');

/**
 * for validating and registering a new user
 *
 * @param {*} user object
 * @param {*} reply object
 *
 */
var register = (user, reply) => {
	return User.registerUser(user)
		.then((result) => {
			return reply.response(result);
		})
		.catch((e) => {
			return reply.response({
				error: e.message
			}).code(400);
		});
};

/**
 * for checking if a user exist and log them in if password matches
 *
 * @param {*} user
 * @param {*} reply
 */
var login = (user, reply) => {
	return User.loginUser(user)
		.then((result) => {
			return reply.response({
				user: {
					id: result._id,
					fullName: result.fullName
				}
			}).header('x-auth',"some authentication token");
		})
		.catch((e) => {
			return reply.response({
				error: e.message
			}).code(400);
		});
};

module.exports = {
	register,
	login
};