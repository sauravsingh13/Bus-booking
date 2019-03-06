var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    cityName: String,
    cityDescription: String,
    
});
/*
    mongoose.model("users", userSchema, "users") name , schema, collection name
*/
var cityCOLL  = mongoose.model("cities", citySchema, "cities");

module.exports = cityCOLL;