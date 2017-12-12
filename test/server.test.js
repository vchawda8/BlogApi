/**
 * @author Vishal Chawda
 * @description for testing all the api and their operations
 */

//require super test and expect for testing
const request = require('supertest');
const expect  = require('expect');

//require server
const app = require('./../server');

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
			done()
		})

		/**
		 * @description it should give a 401 error as invalid credentials are provided
		 */
		it('Should return with 401 error', (done) => {
			done()
		})

		/**
		 * @description it should give a 400 error as not data is provided
		 */
		it('should return with 400 error', (done) => {
			done()
		})
	})
})