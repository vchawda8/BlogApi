const userRoutes = require('./user');
const blogRoutes = require('./blog');

var routesArray = () => {
  return [].concat(userRoutes, blogRoutes);
}

module.exports = routesArray();