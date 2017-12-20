/**
 * @author Vishal Chawda
 *
 * @description registering routes that will serve any users request
 */

//third party or in-built module/s
const Joi = require('joi');

//manually created module/s
const blog = require('./../controller/blog')

/**
 * @description routes required to add and view all blog post
 */
const blogRoutes = [{

	method: 'POST',
	path  : '/blog',
	config: {

		validate: {
			payload: Joi.object({
				blog: Joi.object({
					blogTitle: Joi.required(),
					content  : Joi.required(),
				}).required()
			})
		},
		auth   : 'token',
		handler: blog.addBlogPost
	}

}, {

	method : 'GET',
	path   : '/blog',
	handler: blog.getAllBlogPost

}, {

	method : 'GET',
	path   : '/blog/{blogId}',
	handler: blog.getOneBlogPost

}]

module.exports = blogRoutes;