var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    mobile_no: String,
    googleId: String,
    email: String
});
/*
    mongoose.model("users", userSchema, "users") name , schema, collection name
*/
var usersCOLL  = mongoose.model("users", userSchema, "users");

module.exports = usersCOLL;