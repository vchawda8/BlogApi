/**
 * @author Vishal Chawda
 *
 * this file consist of comments given by the user
 */

//including pre connected mongoose model
const mongoose = require('./dbConfig');

const commentSchema = mongoose.Schema({
  userId: {
    type: Object,
    required: true
  },
  blogId: {
    type: Object,
    required: true
  },
  like: {
    type: Boolean,
  },
  comment: {
    type: String,
    minlength: 6
  }
});

var comment = mongoose.model('comment', commentSchema);