/**
 * @author Vishal Chawda
 *
 * file is responsible to registering route and sending response to the client
 * only communicates with controller
 */

const Joi = require('joi');

//getting controllers
const userController = require('./../controller/user');

//defining all routes for user
const userRoutes = [{
	method: 'POST',
	path: '/users/register',
	config: {
		validate: {
			payload: Joi.object({
				user: Joi.object({
					email: Joi.required(),
					fullName: Joi.required(),
					password: Joi.string().min(6).required()
				})
			}).allow(null)
		},
		handler: (request, reply) => {
			return userController.register(request.payload.user, reply);
		}
	}
}, {
	method: 'POST',
	path: '/users/login',
	config: {
		validate: {
			payload: Joi.object({
				user: Joi.object({
					email: Joi.required(),
					password: Joi.string().min(6).required()
				})
			}).allow(null)
		},
		handler: (request, reply) => {
			return userController.login(request.payload.user, reply);
		}
	}
}, {
	method: 'GET',
	path: '/users/logout',
	handler: (request, reply) => {
		if (!request.header['x-auth']) {
			return reply.response({
				error: "invalid request"
			}).code(400);
		}
		return userController.register(request.payload.user, reply);
	}
}];

module.exports = userRoutes;