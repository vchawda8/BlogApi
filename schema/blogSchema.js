/**
 * @author Vishal Chawda
 *
 * contains schema for blog post
 */

//including pre connected mongoose model
const mongoose = require('./dbConfig');

var blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  content: {
    type: String,
    required: true,
    minlength: 1
  },
  bloggerId: {
    type: Object,
    required: true
  }

});

var blog = mongoose.model('blog', blogSchema);

module.exports = {
  blog
};