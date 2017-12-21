/**
 * @author Vishal Chawda
 *
 * @description responsible to get all request from blog router and perform actions required to full fill the request
 */

 const{ObjectId} = require('mongodb')

//manually created module/s
const Blog = require('./../model/blog')
const User = require('./../model/user')

/**
 * @function addBlogPost
 *
 * @description adding a blog post and providing appropriate response
 *
 * @param {Object} request request made by user for post url
 * @param {Object} reply appropriate response after processing of request
 *
 * @returns {Object} sends response to the request via reply
 */
const addBlogPost = async(request, reply) => {

	let user, blog, result

	user           = await User.findByToken(request.headers.authorization)
	blog           = request.payload.blog
	blog.bloggerId = new ObjectId(user._id)

	try {

		result = await Blog.addBlog(blog)

		return reply({
			blog: result
		})

	} catch (error) {

		return reply({
				error: error.message
			})
			.code(422)

	}

}

/**
 * @function getAllBlogPost
 *
 * @description will get all blog posts from the document and return it to user
 *
 * @param {Object} request users request object consisting all request related information
 * @param {Function} reply reply function which is used to response to user after processing request
 *
 * @returns {Object} will return all blog posts present in the document
 */
const getAllBlogPost = async(request, reply) => {

	try {

		let blogs = await Blog.getAllBlog()

		return reply(blogs)

	} catch (error) {

		return reply({
				error: error.message
			})
			.code(422)

	}

}

/**
 * @function getOneBlogPost
 *
 * @description will get a single blog post from the document and return it to user
 *
 * @param {Object} request users request object consisting all request related information
 * @param {Function} reply reply function which is used to response to user after processing request
 *
 * @returns {Object} will return a single blog post present in the document
 */
const getOneBlogPost = async(request, reply) => {

	try {

		let blog = await Blog.getOneBlog(request.params.blogId)

		if (blog.blog) {
			return reply(blog)
		} else {
			return reply({
				error: "not found"
			}).code(404)
		}

	} catch (error) {

		return reply({
			error: error.message
		}).code(422)

	}

}

module.exports = {
	addBlogPost,
	getAllBlogPost,
	getOneBlogPost
}