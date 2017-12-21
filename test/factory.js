const bcrypt = require('bcrypt')
const Jwt    = require('jsonwebtoken');

const {
  Users,
  Blogs
} = require('./resources/before')

//user object for string into document
const usersObj = {
  fullName: "Vishal Chawda",
  email   : "test@raweng.com",
  password: "testPasswd",
}

//blog object for storing in database
const blogPost = {
  blogTitle: "demo post",
  content  : "lorem ipsum",
  author   : "Vishal Chawda"
}

var populateUser = async() => {
  let salt, passwordHash, token, user, tokens
  var newUser, result
  try {
    await Users.deleteMany()
    salt         = await bcrypt.genSalt(10)
    passwordHash = await bcrypt.hash(usersObj.password, salt)
    newUser      = Object.assign({}, usersObj, {
      password: passwordHash
    })
    result = await Users.insert(newUser)
    user   = result.ops[0]
    token  = Jwt.sign({
      id    : user._id,
      access: 'auth'
    }, 'abc123')
    tokens = [{
      token : token,
      access: 'auth'
    }]
    result = await Users.findOneAndUpdate({_id:user._id},{$set:{tokens}},{new: true})
    result.value.tokens = tokens
    return result.value
  } catch (error) {
    throw error
  }
}

var populateBlog = async() => {
  let result, newBlog
  try {
    user = await populateUser()
    await Blogs.deleteMany()
    newBlog = Object.assign({}, blogPost, {
      blogger: user._id
    })
    result = await Blogs.insert(newBlog)
    return {
      usersObj: user,
      blogPost: result.ops[0]
    }

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