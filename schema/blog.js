/**
 * @author Vishal Chawda
 *
 * @description contains schema for blog post
 */

//including pre connected mongoose model
const mongoose = require('./dbConfig');

var blogSchema = mongoose.Schema({

  blogTitle: {
    type     : String,
    required : true,
    minlength: 3
  },
  content: {
    type     : String,
    required : true,
    minlength: 3
  },
  author: {
    type     : String,
    required : true,
    minlength: 3
  },
  createdAt: {
    type    : String,
    required: true
  }

});

var Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;