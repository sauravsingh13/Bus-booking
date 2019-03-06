var express = require('express');
var router = express.Router();

const authCheck = (req, res, next) => {
    if(req.user){
        res.redirect('/login');
    }else{
        next();
    }
}
router.get('/', function(req, res){
    //res.json(req.user);
    //res.send("hiiii looged in "+req.user.username);
    res.redirect("/user/", {user: req.user});
});

module.exports = router;