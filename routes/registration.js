var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var usersCOLL = require("../Schemas/userSchema");


router.post('/addUsers', function(req, res, next) {
    console.log('sddcdc')
    var newUser = new usersCOLL();
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.mobile_no = req.body.mobile_no;
    newUser.email = req.body.email;
    newUser.save(function(err, _users){
        if(err) return console.log("got some error");
        else{
            res.json(_users);
        }            
    })
});

module.exports = router;