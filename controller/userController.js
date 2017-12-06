//code author Vishal Chawda

//require user model
const Users = require('./../models/users');

var register = (user, reply) => {
    var newUser = new Users(user);
    return newUser.save().then((result) => {
        return reply.response(result);
    }).catch((e) => {
        return reply.response({
            error: e.message
        }).code(400);
    });
};

module.exports = {
    register
};