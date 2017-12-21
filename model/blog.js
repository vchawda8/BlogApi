/**
 * @author Vishal Chawda
 *
 * @description performs basic CRUD operation on the blog schema
 */

const Blog = require('./../schema/blog')

/**
 * @function addBlog
 *
 * @description adds a blog to the document if everything is validated
 *
 * @param {Object} blog {blogTitle:string, content:string, bloggerId:string, author:string, createdAt:string}
 *
 * @returns {Object} object of saved blog or error
 */
var addBlog = async(blog) => {

	let result, newBlog

	try {

		newBlog           = new Blog(blog)
		newBlog.createdAt = Math.floor((new Date).getTime() / 1000)
		result            = await newBlog.save()

		return result

	} catch (error) {

		throw error

	}

}

/**
 * @function getAllBlog
 *
 * @description will return all blogs present inside a document
 *
 * @returns {Array} array of object consisting of all blogs
 */
var getAllBlog = async() => {

	let blogs = await Blog.find().populate('blogger', ['fullName']).exec()

	return {
		blogs
	}

}

/**
 * @function getOneBlog
 *
 * @description returns a blog from a provided blog id
 *
 * @param {String} blogId blog-id: string
 *
 * @returns {Object} blog or error
 */
var getOneBlog = async(blogId) => {

	let blog = await Blog.findById(blogId).populate('blogger', ['fullName']).exec()

	return {
		blog
	}

}

/**
 * @function findByBlogger
 *
 * @description gets all blogs posted by a user and return it
 *
 * @param {ObjectId} userId userId-objectId of user who's id are to be fetched
 *
 * @returns {Object} an object of array which consist of all blogs
 */
var findByBlogger = async(userId)=>{
	let blogs = await Blog.find({blogger:userId}).populate('blogger',['fullName']).exec()
	return{
		blogs
	}
}

module.exports = {
	addBlog,
	getAllBlog,
	getOneBlog,
	findByBlogger
}