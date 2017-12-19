/**
 * @author Vishal Chawda
 *
 * @description responsible to get all request from blog router and perform actions required to full fill the request
 */

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
  blog.author    = user.fullName
  blog.bloggerId = user._id.toHexString()

  try {

    result = await Blog.addBlog(blog)
    return reply.response({
      blog: result
    })

  } catch (error) {

    return reply.response({
      error: error.message
    }).code(422)

  }

}

const getAllBlogPost = async(request, reply) => {

}

const getOneBlogPost = async(request, reply) => {

}

module.exports = {
  addBlogPost,
  getAllBlogPost,
  getOneBlogPost
}