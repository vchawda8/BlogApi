// /**
//  * @author Vishal Chawda
//  * @description for testing all the api and their operations
//  */

// //require super test and expect for testing
// const request = require('supertest')
// const expect  = require('expect')

// //require server
// const app = require('./../server')
// const {
// 	usersObj,
// 	blogPost,
// 	populate
// } = require('./factory')

// beforeEach(populate)

// /**
//  * @description for testing of blog api
//  */
// describe('Blog API /blog', () => {

// 	/**
// 	 * @description tests for saving a blog posts
// 	 */
// 	describe('POST /blog', () => {

// 		/**
// 		 * @description it should successfully create a blog post
// 		 */
// 		it('should return an object of successfully created blog', (done) => {

// 			let blog = {
// 				blog: {
// 					blogTitle: "demo",
// 					content  : "lorem ipsum",
// 					author   : "Vishal Chawda"
// 				}
// 			}

// 			request(app.listener)
// 				.post('/blog')
// 				.set({
// 					'authorization': usersObj[0].tokens[0].token
// 				})
// 				.send(blog)
// 				.expect(200)
// 				.expect((res) => {
// 					expect(res.body.blog._id).toExist
// 					expect(res.body.blog.blogTitle).toBe(blog.blog.blogTitle)
// 					expect(res.body.blog.content).toBe(blog.blog.content)
// 				})
// 				.end(done)

// 		})

// 		/**
// 		 * @description it should give a 401 error for no token provided
// 		 */
// 		it('should give a 401 error', (done) => {

// 			let blog = {
// 				blog: {
// 					blogTitle: "demo",
// 					content  : "lorem ipsum",
// 					author   : "some author"
// 				}
// 			}

// 			request(app.listener)
// 				.post('/blog')
// 				.send(blog)
// 				.expect(401)
// 				.end(done)

// 		})

// 		/**
// 		 * @description it should give a 400 error as no data is sent
// 		 */
// 		it('should give a 400 error', (done) => {

// 			request(app.listener)
// 				.post('/blog')
// 				.set({
// 					'authorization': usersObj[0].tokens[0].token
// 				})
// 				.expect(400)
// 				.end(done)

// 		})

// 		/**
// 		 * @description it should give 422 error for validation of data
// 		 */
// 		it('should give a 422 error', (done) => {

// 			let blog = {
// 				blog: {
// 					blogTitle: "de",
// 					content  : "lo",
// 					author   : "some"
// 				}
// 			}

// 			request(app.listener)
// 				.post('/blog')
// 				.set({
// 					'authorization': usersObj[0].tokens[0].token
// 				})
// 				.send(blog)
// 				.expect(422)
// 				.end(done)

// 		})

// 	})

// })