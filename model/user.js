/**
 * @author Vishal Chawda
 *
 * this file will be responsible to perform crud operations on the schema
 */

//require user schema
const User = require('./../schema/userSchema');

var registerUser = (user) => {
    return new Promise((resolve, reject) => {
        var newUser = new User(user);
        newUser.save()
            .then((result) => {
                resolve(result);
            })
            .catch((e) => {
                reject(e);
            })
    });
}

module.exports = {
    registerUser
};