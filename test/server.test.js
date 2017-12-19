/**
 * @author Vishal Chawda
 * @description for testing all the api and their operations
 */

//require super test and expect for testing
const request = require('supertest')
const expect  = require('expect')
const Jwt     = require('jsonwebtoken');
const {
	ObjectId
} = require('mongodb')

//require server
const app       = require('./../server')
const userModel = require('./../model/user')
const User      = require('./../schema/user')
const Blog      = require('./../schema/blog')
const blogModel = require('./../model/blog')


//user object for string into document
var   userId   = new ObjectId()
const usersObj = [{
	_id     : userId,
	fullName: "Vishal Chawda",
	email   : "test@raweng.com",
	password: "testPasswd",
	tokens  : [{
		token: Jwt.sign({
			id    : userId,
			access: 'auth'
		}, 'abc123'),
		access: 'auth'
	}]
}]

//blog object for storing in database
var   blogId   = new ObjectId()
const blogPost = [{
	_id      : blogId,
	blogTitle: "demo post",
	content  : "lorem ipsum",
	author   : usersObj[0].fullName,
	bloggerId: usersObj[0]._id.toHexString()
}]

beforeEach((done) => {

	User.remove({})
		.then(() => {
			return userModel.registerUser(usersObj[0])
		})
		.then(() => {
			return Blog.remove({})
		}).then(() => {
			return blogModel.addBlog(blogPost[0])
		})
		.then(() => {
			done()
		})
		.catch((err) => {
			console.log(err)
			done(err)
		})

})

/**
 * @description for testing all users api
 */
describe('User Api /users', () => {

	/**
	 * @description for testing register api
	 */
	describe('POST /users/register', () => {

		/**
		 * @description it should give a 400 response for invalid request
		 */
		it('should get 400 error', (done) => {

			request(app.listener)
				.post('/users/register')
				.expect(400)
				.end(done)

		})

		/**
		 * @description it should give success response with token in header
		 */
		it('should return user after successful registration', (done) => {

			let userData = {
				user: {
					fullName: "Vishal Chawda",
					email   : "vchawda8@gmail.com",
					password: "newpasswd"
				}
			}

			request(app.listener)
				.post('/users/register')
				.send(userData)
				.expect(200)
				.expect((res) => {
					expect(res.header['x-auth']).toExist
					expect(res.fullName).toBe(userData.fullName)
				})
				.end(done)

		})

		/**
		 * @description it should respond with 422 error as invalid data is provided
		 */
		it('should return 422 error for validation', (done) => {

			let userData = {
				user: {
					fullName: "Vishal Chawda",
					email   : "vchawda8gmail.com",
					password: "newpasswd"
				}
			}

			request(app.listener)
				.post('/users/register')
				.send(userData)
				.expect(422)
				.end(done)

		})

	})

	/**
	 * @description for testing login api
	 */
	describe('POST /users/login', () => {

		/**
		 * @description it should give a success response with token in header as all valid credentials are provided
		 */
		it('Should successfully login user', (done) => {

			let userData = {
				user: {
					email   : "test@raweng.com",
					password: "testPasswd"
				}
			}

			request(app.listener)
				.post('/users/login')
				.send(userData)
				.expect(200)
				.expect((res) => {
					expect(res.header['x-auth']).toExist
					expect(res.body.user).toExist
					expect(res.body.user._id).toExist

				})
				.end(done)

		})

		/**
		 * @description it should give a 401 error as invalid credentials are provided
		 */
		it('Should return with 401 error', (done) => {

			let userData = {
				user: {
					email   : "vchawda8@gmail.com",
					password: "newpsswd"
				}
			}

			request(app.listener)
				.post('/users/login')
				.send(userData)
				.expect(401)
				.end(done)

		})

		/**
		 * @description it should give a 400 error as not data is provided
		 */
		it('should return with 400 error', (done) => {

			request(app.listener)
				.post('/users/login')
				.expect(400)
				.end(done)

		})

	})

	/**
	 * @description for testing logout api
	 */
	describe('GET /users/logout', () => {

		/**
		 * @description it should return a success response with removed token
		 */
		it('should return a success message', (done) => {

			request(app.listener)
				.get('/users/logout')
				.set({
					'authorization': usersObj[0].tokens[0].token
				})
				.expect(200)
				.end(done)
		})

		/**
		 * @description it should return a 401 error as token is not provided
		 */
		it('should return 401 error for invalid request', (done) => {
			request(app.listener)
				.get('/users/logout')
				.expect(401)
				.end(done)
		})

		/**
		 * @description it should return a 401 error for invalid token
		 */
		it('should return a 401 error for invalid token', (done) => {
			request(app.listener)
				.get('/users/logout')
				.set({
					'authorization': "kjdsfhjdsfdfhjdsfhkjdsfop378345789trekjgdfkjhgdfuhjt7845r89urewfkjhgre"
				})
				.expect(401)
				.end(done)

		})

	})

})

/**
 * @description for testing of blog api
 */
describe('Blog API /blog', () => {

	/**
	 * @description tests for saving a blog posts
	 */
	describe('POST /blog', () => {

		/**
		 * @description it should successfully create a blog post
		 */
		it('should return an object of successfully created blog', (done) => {

			let blog = {
				blog: {
					blogTitle: "demo",
					content  : "lorem ipsum"
				}
			}

			request(app.listener)
				.post('/blog')
				.set({
					'authorization': usersObj[0].tokens[0].token
				})
				.send(blog)
				.expect(200)
				.expect((res) => {
					expect(res.body.blog._id).toExist
					expect(res.body.blog.blogTitle).toBe(blog.blog.blogTitle)
					expect(res.body.blog.content).toBe(blog.blog.content)
				})
				.end(done)

		})

		/**
		 * @description it should give a 401 error for no token provided
		 */
		it('should give a 401 error', (done) => {

			let blog = {
				blog: {
					blogTitle: "demo",
					content  : "lorem ipsum"
				}
			}

			request(app.listener)
				.post('/blog')
				.send(blog)
				.expect(401)
				.end(done)

		})

		/**
		 * @description it should give a 400 error as no data is sent
		 */
		it('should give a 400 error', (done) => {

			request(app.listener)
				.post('/blog')
				.set({
					'authorization': usersObj[0].tokens[0].token
				})
				.expect(400)
				.end(done)

		})

		/**
		 * @description it should give 422 error for validation of data
		 */
		it('should give a 422 error', (done) => {

			let blog = {
				blog: {
					blogTitle: "de",
					content  : "lo"
				}
			}

			request(app.listener)
				.post('/blog')
				.set({
					'authorization': usersObj[0].tokens[0].token
				})
				.send(blog)
				.expect(422)
				.end(done)

		})

	})

})