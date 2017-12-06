//test author Vishal Chawda

//require super test and expect for testing
const request = require('supertest');
const expect = require('expect');

//require server
const app = require('./../server');

describe('User Api', () => {
    describe('POST /users', () => {
        it('should get 400 error', (done) => {
            request(app.listener)
                .post('/users/login')
                .expect(400)
                .end(done);
        });
    });
});