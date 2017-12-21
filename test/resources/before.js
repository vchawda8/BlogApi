var mongoose         = require('mongoose')
    mongoose.Promise = Promise

//connect to database
var db = mongoose.createConnection('localhost', 'bloggingTest');

//drop database
db.dropDatabase().then(() => {

}).catch((err) => {
	console.log(err)
})

//fetch all schema from json
const userSchema = require('./classes/user.json')
const blogSchema = require('./classes/blog.json')

//create new database
db.useDb('bloggingTest')

//create collection from schema
const Users = db.collection('users', userSchema)
const Blogs = db.collection('blogs', blogSchema)

//bind all models
const allModels = {
	Users,
	Blogs
}

module.exports = allModels