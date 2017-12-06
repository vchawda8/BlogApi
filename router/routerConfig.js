const userRoutes = require('./user');
const blogRoutes = require('./blog');

module.exports = [].concat(userRoutes, blogRoutes);