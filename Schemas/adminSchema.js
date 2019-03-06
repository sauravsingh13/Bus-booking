var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    firstname: String,
    password: String
});
/*
    mongoose.model("admin", adminSchema, "admin") name , schema, collection name
*/
var adminCOLL  = mongoose.model("admin", adminSchema, "admin");

module.exports = adminCOLL;