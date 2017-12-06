//code author Vishal Chawda

//getting controllers
const userController = require('./../controller/userController');

//defining all routes for user
const userRoutes = [{
    method: 'POST',
    path: '/users/register',
    handler: (request, reply) => {
        if (!request.payload.user) {
            return reply.response({
                error: "invalid input"
            }).code(400);
        }
        return userController.register(request.payload.user, reply);
    }
}, {
    method: 'POST',
    path: '/users/login',
    handler: function (request, reply) {
        return reply.response().code(400);
    }
}, {
    method: 'GET',
    path: '/users/logout',
    handler: function (request, reply) {
        return reply.response().code(400);
    }
}];

module.exports = userRoutes;