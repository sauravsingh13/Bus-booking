var express = require('express');
var mongoose = require('mongoose');
var passport = require("passport");
var localStorage = require('localStorage');
var router = express.Router();
var usersCOLL = require("../Schemas/userSchema");
var adminCOLL = require("../Schemas/adminSchema");

router.get('/users', function(req, res, next) {
    usersCOLL.find({"username": req.query.username, "password": req.query.password}, function(err, _data){
        if(err) return console.log("got some error");
        else{
            var result = {};
            if(_data.length > 0){
                result.login = "LoggedIn";
                result.user = _data[0];
            }else{
                result.login = "Failed";
                result.user = [];
            }
            res.json(result);
        }          
      });    
});

router.get('/authUser', function(req, res){
    console.log("params===>", {_id: req.query.token})
    
    usersCOLL.findOne({_id: req.query.token}, function(err, userExists){
        console.log("userExists===>", userExists)
        var result = {};
        if(err){ 
            return console.log("got some error");
            //res.redirect('/login');            
        }else{
            console.log("im innnnnnnnn==========>")
            result.login = "LoggedIn";
            result.user = [userExists];
            res.json(result);
        }
    });
});

router.get('/admin', function(req, res, next) {
    adminCOLL.find({"username": req.query.username, "password": req.query.password}, function(err, _data){
        console.log("_data===================>", _data)
        if(err) return console.log("got some error");
        else{
            var result = {};
            if(_data.length > 0){
                result.login = "LoggedIn";
                result.admin = _data[0];
            }else{
                result.login = "Failed";
                result.admin = [];
            }
            res.json(result);
        }
      });    
});

// Auth with Google

router.get('/google', passport.authenticate('google', {
    scope: ['email','profile']
}));
// callback route for google to redirect to 
router.get('/google/redirect', passport.authenticate('google') , function(req, res){
    res.redirect("/user?token=" + req.user.id);
});

module.exports = router;
