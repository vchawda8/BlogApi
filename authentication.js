/**
 * @author Vishal Chawda
 *
 * @description validation function for authenticate section of urls
 */

var User = require('./model/user')

/**
 * @function validate
 *
 * @description will test if the token sent via header is valid
 *
 * @param {Object} decodedToken
 * @param {Object} request
 * @param {Function} callback
 *
 * @returns {Function} call back to the url after success
 */
var validate = async(decodedToken, request, callback) => {
  var user = await User.findByToken(request.headers.authorization)
  if (user._id == decodedToken.id) {
    return callback(null, true)
  } else {
    return callback(null, false)
  }
}

module.exports = {
  validate
}