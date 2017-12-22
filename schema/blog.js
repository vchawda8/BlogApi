/**
 * @author Vishal Chawda
 *
 * @description contains schema for blog post
 */

//including pre connected mongoose model
const mongoose = require('./dbConfig');

/**
 * @description defining a schema for blog with validations and ref. of user who created it
 */
var blogSchema = mongoose.Schema({
	blogTitle: {
		type     : String,
		required : true,
		minlength: 3
	},
	content: {

		type     : String,
		required : true,
		minlength: 3

	},
	blogger: {

		type: mongoose.Schema.Types.ObjectId,
		ref : 'users'

	},
	author: {

		type     : String,
		required : true,
		minlength: 3

	},
	createdAt: {

		type     : String,
		required : true,
		minlength: 1
	}

});


/**
 * @description creating a model for blog using the blog schema
 */
var Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;