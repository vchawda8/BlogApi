/**
 * @author Vishal Chawda
 *
 * main server file which is responsible for starting server and listening to the client request
 */

'use strict';

const Hapi = require('hapi');
const jwt = require('hapi-auth-jwt2');

const routes = require('./router/routerConfig');

// Create a server with a host and port
const server = Hapi.server({
	host: 'localhost',
	port: 3000
});

server.route(routes);

// Start the server
async function start() {

	try {
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log('Server running at:', server.info.uri);
};

module.exports = server;

start();