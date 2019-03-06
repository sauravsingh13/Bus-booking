const nodemailer = require("nodemailer");
var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
 console.log(req.body)
   nodemailer.createTestAccount((err, acoount)=>{
       const htmlEmail = `
       <h3>You have successfully booked a ticked</h3>
       <p>Your seats booked are</p>
       <p> ${req.body.seatBooked} </p>`
         let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'deshaun20@ethereal.email', // generated ethereal user
      pass: 'PAySuZ3pkqbB1jEmA1' // generated ethereal password
    }
  });
    let mailOptions = {
    from: '"Saurav Kumar 👻" <saurav1895@gmail.com>', // sender address
    to: 'deshaun20@ethereal.email', // list of receivers
    subject: "Bus-Booking ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: htmlEmail // html body
  };
      transporter.sendMail(mailOptions,(err, info) => {
          if(err){
              return console.log(err)
          }
          console.log('Message Sent',nodemailer.getTestMessageUrl(info))
      })

   });


});

module.exports = router;
<<<<<<< HEAD
// // async..await is not allowed in global scope, must use a wrapper
// async function main(){

//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let account = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: account.user, // generated ethereal user
//       pass: account.pass // generated ethereal password
//     }
//   });

//   // setup email data with unicode symbols
//   let mailOptions = {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>" // html body
//   };

//   // send mail with defined transport object
//   let info = await transporter.sendMail(mailOptions)

//   console.log("Message sent: %s", info.messageId);
//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
=======

>>>>>>> 329539f26daecc7302fe8dc610ea9a2133843505
