/**
 * @author Vishal Chawda
 *
 * @description performs basic CRUD operation on the blog schema
 */

const Blog = require('./../schema/blog')
const User = require('./user')

/**
 * @function addBlog
 *
 * @description adds a blog to the document if everything is validated
 *
 * @param {Object} blog {blogTitle:string, content:string, createdAt:string}
 * @param {String} author author name
 *
 * @returns {Object} object of saved blog or error
 */
var addBlog = async(blog, author) => {

  let result, newBlog

  newBlog           = new Blog(blog)
  newBlog.author    = author
  newBlog.createdAt = Math.floor((new Date).getTime() / 1000)
  result            = await newBlog.save()

  return result;

}

/**
 * @function getAllBlog
 *
 * @description will return all blogs present inside a document
 *
 * @returns {Array} array of object consisting of all blogs
 */
var getAllBlog = async() => {

  let blogs = await Blog.find()

  return blogs

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

  let blog = await Blog.findById(blogId)

  return blog

}