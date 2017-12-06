/**
 * @author Vishal Chawda
 *
 * file contains schema for user document and also provides validation for the same
 */

//including pre connected mongoose model
const mongoose = require('./dbConfig');

//define document schema for user table
const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate:
			(value) => {
				return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
			}
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