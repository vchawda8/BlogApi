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

var userId   = new ObjectId()
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

beforeEach((done) => {

	console.log(usersObj)

	User.remove({})
		.then()
		.catch((err) => {
			console.log(err)
			done(err)
		})

	userModel.registerUser(usersObj[0])
	.then(() => done())
	.catch((error) => done(error))

})

/**
 * @description for testing all users api
 */
describe('User Api /users', () => {

	/**
	 * @description for testing register api
	 */
	describe('POST /users/register', () => {
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
			console.log(userData);
			request(app.listener)
				.post('/users/login')
				.send(userData)
				.expect(200)
				.expect((res) => {
					console.log(res.body)
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
		it('should return a success message', (done) => {
			request(app.listener)
				.get('/users/logout')
				.set({
					'x-auth': usersObj[0].tokens[0].token
				})
				.expect(200)
				.end(done)
		})
		it('should return 400 error for invalid request', (done) => {
			request(app.listener)
				.get('/users/logout')
				.expect(400)
				.end(done)
		})
		it('should return a 422 error for invalid token', (done) => {
			request(app.listener)
				.get('/users/logout')
				.set({
					'x-auth': "kjdsfhjdsfdfhjdsfhkjdsfop378345789trekjgdfkjhgdfuhjt7845r89urewfkjhgre"
				})
				.expect(422)
				.end(done)
		})
	})
})