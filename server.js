/**
 * @author Vishal Chawda
 *
 * @description main server file which is responsible for starting server and listening to the client request
 */

'use strict';

/**
 * @description For setting up environment if provided
 */
var env = process.env.NODE_ENV || 'development'

if (env == 'development') {
	process.env.PORT        = 3000
	process.env.MONGODB_URI = 'mongodb://localhost:27017/blogging'
} else if (env == 'test') {
	process.env.PORT        = 3000
	process.env.MONGODB_URI = 'mongodb://localhost:27017/bloggingTest'
}

const Hapi     = require('hapi')
const authJwt2 = require('hapi-auth-jwt2')

const routes = require('./router/routerConfig')
const {
	validate
} = require('./authentication')

/**
 * @description crates server const which consist of host and port
 */
const server = new Hapi.Server()
server.connection({
	host: 'localhost',
	port: process.env.PORT
})



const start = async() => {

	await server.register(authJwt2)

	server.auth.strategy('token', 'jwt', {
		key          : 'abc123',
		validateFunc : validate,
		verifyOptions: {
			algorithms: ['HS256']
		}
	});

	/**
	 * @description gets all routes used in
	 */
	server.route(routes)

	await server.start();

	return server;
}

start()
	.then((server) => console.log(`Server listening on ${server.info.uri}`))
	.catch(err => {

		console.error(err);
		process.exit(1);
	})

module.exports = server