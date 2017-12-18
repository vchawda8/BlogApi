/**
 * @author Vishal Chawda
 *
 * @description for connecting to mongodb and providing access to other schemas
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