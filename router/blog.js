//code author Vishal Chawda

//defining all routes for user
const blogRoutes = [{
    method: 'POST',
    path: '/blog/register',
    handler: function (request, reply) {
        return reply.response().code(400);
    }
}, {
    method: 'POST',
    path: '/blog/login',
    handler: function (request, reply) {
        return reply.response().code(400);
    }
}, {
    method: 'POST',
    path: '/blog/logout',
    handler: function (request, reply) {
        return reply.response().code(400);
    }
}];

module.exports = blogRoutes;