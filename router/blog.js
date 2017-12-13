/**
 * @author Vishal Chawda
 * @description registering routes that will serve any users request
 */

const blogRoutes = [{
    method: 'GET',
    path: '/blog',
    handler: function (request, reply) {
        return reply.response().code(400)
    }
}, {
    method: 'GET',
    path: '/blog/{blogId}',
    handler: function (request, reply) {
        return reply.response().code(400)
    }
}]

module.exports = blogRoutes;