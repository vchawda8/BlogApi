/**
 * @author Vishal Chawda
 * 
 * file contains schema for user document and also provides validation for the same
 */

//require 3rd party modules or inbuilt once
const validator = require('validator');

//including pre connected mongoose model
const mongoose = require('./dbConfig');

//define document schema for user table
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [{
            validator: value => isEmail(value),
            msg: 'Invalid email.'
        }]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullName: {
        type: String,
        required: true,
        minlength: 5
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;