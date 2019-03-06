var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var cityCOLL = require("../Schemas/citySchema");


router.post('/addCity', function(req, res, next) {
    console.log('ADDCITY')
    var newCity = new cityCOLL();
    newCity.cityName = req.body.cityName;
    newCity.cityDescription = req.body.cityDescription;
    newCity.save(function(err, _city){
        if(err) return console.log("got some error");
        else{
            res.json(_city);
        }            
    })
});

router.get('/viewCity',function(req,res,next){
    console.log('VIEWCITY')
    cityCOLL.find({}).then(data => {
            res.status(200).json({
                    message: "Cities fetched successfully!",
                    cities: data
                  });
    }).catch(err => console.log("error : -",err))
            
    

});

router.delete("/delete/:id",(req,res,next) => {
    const id = req.params.id
    cityCOLL.remove({_id:id}).then(data =>{
            res.status(200).json({message: 'City Deleted'})
    })
    console.log('deleted')
    //issues = issues.filter(item => item.id != id)

})
router.put("/update/:id", (req,res,next) => {
    cityCOLL.updateOne({_id: req.params.id}, req.body).then(result => {
            res.status(200).json({message: 'City Updated'})
    })
})
module.exports = router;