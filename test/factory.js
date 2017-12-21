const Jwt = require('jsonwebtoken');
const {
  ObjectId
} = require('mongodb')

const {
  Users,
  Blogs
} = require('./resources/before')

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
  author   : "Vishal Chawda",
  bloggerId: usersObj[0]._id.toHexString()
}]

var populateUser = async() => {

  try {
    await Users.deleteMany()
    newUser = await Users.insert(usersObj)

    return newUser.ops[0]

  } catch (error) {

    throw error

  }

}


module.exports = {
  usersObj,
  blogPost,
  populateUser
}