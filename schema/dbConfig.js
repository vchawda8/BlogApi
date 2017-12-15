/**
 * @author Vishal Chawda
 */


//including mongoose library
const mongoose = require('mongoose');

//setting promise as global as mongoose.promise is deprecated
mongoose.Promise = global.Promise;

//connect with mongoose database
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
});

//exporting mongoose for making it available for all models
module.exports = mongoose;