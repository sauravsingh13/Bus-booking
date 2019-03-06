var mongoose = require('mongoose');

var busSchema = new mongoose.Schema({
    name: String,
    description: String,
    fromCity:String,
    toCity:String,
    fromCityTime:String,
    toCityTime:String,
    duration:Number,
    totalSeats:Number,
    price:Number,
    seatStatus:Array
});
/*
    mongoose.model("users", userSchema, "users") name , schema, collection name
*/
var busCOLL  = mongoose.model("busses", busSchema, "busses");

module.exports = busCOLL;