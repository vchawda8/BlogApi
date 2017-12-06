const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');

module.exports = [].concat(userRoutes, blogRoutes);