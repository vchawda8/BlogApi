/**
 * @author Vishal Chawda
 *
 * @description main server file which is responsible for starting server and listening to the client request
 */

'use strict';

var env = process.env.NODE_ENV || 'development'

if (env == 'development') {
	process.env.PORT = 3000
	process.env.MONGODB_URI = 'mongodb://localhost:27017/blogging'
} else if (env == 'test') {
	process.env.PORT = 3000
	process.env.MONGODB_URI = 'mongodb://localhost:27017/bloggingTest'
}

const Hapi = require('hapi');

const routes = require('./router/routerConfig');

/**
 * @description crates server const which consist of host and port
 */
const server = Hapi.server({
	host: 'localhost',
	port: process.env.PORT
});

/**
 * @description gets all routes used in
 */
server.route(routes);

/**
 * @description starts the server also will provide any error if the server doesn't start
 */
async function start() {

	try {
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log('Server running at:', server.info.uri);

};

start();

module.exports = server;