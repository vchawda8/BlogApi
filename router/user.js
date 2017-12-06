//code author Vishal Chawda

//getting controllers
const userController = require('./../controller/user');

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
    handler: (request, reply) => {
        if (!request.payload.user) {
            return reply.response({
                error: "invalid input"
            }).code(400);
        }
        return userController.register(request.payload.user, reply);
    }
}, {
    method: 'GET',
    path: '/users/logout',
    handler: (request, reply) => {
        if (!request.payload.user) {
            return reply.response({
                error: "invalid input"
            }).code(400);
        }
        return userController.register(request.payload.user, reply);
    }
}];

module.exports = userRoutes;