/**
 * @author Vishal Chawda
 *
 * @description getting all routes and combining it in one array and exporting it
 */
const userRoutes = require('./user');
const blogRoutes = require('./blog');

var routesArray = () => {
	return [].concat(userRoutes, blogRoutes);
}

module.exports = routesArray();