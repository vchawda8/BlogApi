/**
 * @author Vishal Chawda
 *
 * @description registering routes that will serve any users request
 */

const blog = require('./../controller/blog')

const blogRoutes = [{

    method: 'POST',
    path  : '/blog',
    config: {

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