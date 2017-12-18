/**
 * @author Vishal Chawda
 * @description file is responsible to registering route and sending response to the client
 * only communicates with controller
 */

const Joi = require('joi');

//getting controllers
const userController = require('./../controller/user');

//defining all routes for user
const userRoutes = [{
	method: 'POST',
	path  : '/users/register',
	config: {
		validate: {
			payload: Joi.object({
				user: Joi.object({
					email   : Joi.required(),
					fullName: Joi.required(),
					password: Joi.string().min(6).required()
				}).required()
			})
		},
		handler: (request, reply) => {
			return userController.register(request.payload.user, reply);
		}
	}
}, {
	method: 'POST',
	path  : '/users/login',
	config: {
		validate: {
			payload: Joi.object({
				user: Joi.object({
					email   : Joi.required(),
					password: Joi.string().min(6).required()
				}).required()
			})
		}
	},
	handler: (request, reply) => {
		return userController.login(request.payload.user, reply);
	}
}, {
	method: 'GET',
	path  : '/users/logout',
	config: {
		handler: (request, reply) => {
			var auth = request.headers['x-auth']

			if (!auth) {
				return reply
					.response({
						error: "Header is required"
					})
					.code(400);
			}

			return userController.logout(auth, reply);
		}
	}
}]

module.exports = userRoutes;