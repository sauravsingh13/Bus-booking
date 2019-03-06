var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var busCOLL = require("../Schemas/busSchema");


router.post('/addBus', function(req, res, next) {
    console.log('ADDBUS')
    var newBus = new busCOLL();
    newBus.name = req.body.name;
    newBus.description = req.body.description;
    newBus.fromCity = req.body.fromCity,
    newBus.toCity = req.body.toCity,
    newBus.fromCityTime = req.body.fromCityTime,
    newBus.toCityTime = req.body.toCityTime,
    newBus.duration = req.body.duration,
    newBus.totalSeats = req.body.totalSeats,
    newBus.price = req.body.price,
    newBus.seatStatus = req.body.seatStatus
    newBus.save(function(err, _bus){
        if(err) return console.log("got some error");
        else{
            res.json(_bus);
        }            
    })
});

router.get('/viewBus',function(req,res,next){
    console.log('VIEWBUS')
    busCOLL.find({}).then(data => {
            res.status(200).json({
                    message: "Busses fetched successfully!",
                    busses: data
                  });
    }).catch(err => console.log("error : -",err))
})
            
    


router.delete("/delete/:id",(req,res,next) => {
    console.log('BUSDELETED')
    const id = req.params.id
    busCOLL.remove({_id:id}).then(data =>{
            res.status(200).json({message: 'Bus Deleted'})
    })
    console.log('deleted')

})
router.put("/update/:id", (req,res,next) => {
    busCOLL.updateOne({_id: req.params.id}, req.body).then(result => {
            res.status(200).json({message: 'Bus Updated'})
    })
})
router.put("/seatUpdate/:id", (req,res,next) => {
    busCOLL.updateOne({_id: req.params.id}, {$set: {seatStatus:req.body.seatStatus}}).then(result => {
            res.status(200).json({message: 'Seat Updated'})
    })
})


module.exports = router;