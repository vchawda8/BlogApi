/**
 * @author Vishal Chawda
 * @description for testing all the api and their operations
 */

//require super test and expect for testing
const request = require('supertest')
const expect  = require('expect')

//require server
const app = require('./../server')
const {
  populateBlog
} = require('./factory')

var result, blogPost, usersObj

beforeEach(async() => {
  result   = await populateBlog()
  blogPost = result.blogPost
  usersObj = result.usersObj
})

/**
 * @description for testing of blog api
 */
describe('Test cases for blog API', () => {

  /**
   * @description tests for saving a blog posts
   */
  describe('Test case for adding a blog', () => {

    /**
     * @description it should successfully create a blog post
     */
    it('should return an object of successfully created blog', (done) => {

      let blog = {
        blog: {
          blogTitle: "demo",
          content  : "lorem ipsum",
          author   : "Vishal Chawda"
        }
      }

      request(app.listener)
        .post('/blog')
        .set({
          'authorization': usersObj.tokens[0].token
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
          content  : "lorem ipsum",
          author   : "some author"
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
          'authorization': usersObj.tokens[0].token
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
          content  : "lorem ipsum",
          author   : "some"
        }
      }

      request(app.listener)
        .post('/blog')
        .set({
          'authorization': usersObj.tokens[0].token
        })
        .send(blog)
        .expect(422)
        .end(done)

    })

  })

  /**
   * @description test cases for retrieving all blog posts
   */
  describe('Test case for getting all blog post', () => {

    /**
     * @description test case for getting all blog post successfully
     */
    it('should return all blog posts present in document', (done) => {
      request(app.listener)
        .get('/blog')
        .expect(200)
        .expect((res) => {
          let blogs = res.body.blogs
          expect(blogs).toExist
          expect(typeof blogs).toBe('object')
          expect(blogs[0].blogger.fullName).toBe(usersObj.fullName)
        })
        .end(done)
    })
  })

  /**
   * @description Test cases for getting a single blog post
   */
  describe('Test case for getting single blog post', () => {

    /**
     * @description test case for successfully returning a blog post
     */
    it('should return a single blog post present in document', (done) => {
      request(app.listener)
        .get('/blog/' + blogPost._id)
        .expect(200)
        .expect((res) => {
          expect(res.body.blog).toExist
          expect(typeof res.body.blog).toBe('object')
          expect(res.body.blog.blogger.fullName).toBe(usersObj.fullName)
        })
        .end(done)
    })

    /**
     * @description test case for generating an error
     */
    it('should return 404 error for invalid id', (done) => {
      request(app.listener)
        .get('/blog/5a3b8cdd35990f13ee154abf')
        .expect(404)
        .end(done)
    })
  })

})