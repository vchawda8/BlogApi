const Jwt     = require('jsonwebtoken');
const {
	ObjectId
} = require('mongodb')

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

var populate = (done) => {

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
}


module.exports = {
  usersObj,
  blogPost,
  populate
}