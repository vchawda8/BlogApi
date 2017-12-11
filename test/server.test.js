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
 * @description for
 */
describe('User Api', () => {
	describe('POST /users', () => {
		it('should get 400 error', (done) => {
			request(app.listener)
				.post('/users/login')
				.expect(400)
				.end(done);
		});
		it('should return user after successful registration', (done) => {

		});
		it('should return 422 error for validation', (done) => {

		});
	});
});