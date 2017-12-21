const bcrypt = require('bcrypt')
const Jwt    = require('jsonwebtoken');
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
  let salt, passwordHash
  var newUser, result

  try {

    await Users.deleteMany()

    salt         = await bcrypt.genSalt(10)
    passwordHash = await bcrypt.hash(usersObj[0].password, salt)

    newUser = Object.assign({}, usersObj[0], {
      password: passwordHash
    })

    result = await Users.insert(newUser)

    return result.ops[0]

  } catch (error) {

    throw error

  }

}

var populateBlog = async()=>{
  let result

  try {

    await Blogs.deleteMany()

    result = Blogs.insert(blogPost[0])

    return result.ops[0]

  } catch (error) {

    throw error

  }

}


module.exports = {
  usersObj,
  blogPost,
  populateUser,
  populateBlog
}