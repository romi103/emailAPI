// server.js

// set up ======================================================================

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var pass = process.env.PASS;
var user = process.env.USER;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
app.use(morgan('dev')); // log every request to the console

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: user,
        pass: pass
    }
});

// setup e-mail data with unicode symbols


// send mail with defined transport object

app.post('/', function (req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var massage = req.body.message;
    
    
    var mailOptions = {
    to: 'romanlorent.site@gmail.com', // list of receivers
    subject: 'Massage from the site', // Subject line
    html: '  <p>Email: ' + email +'</p><br /><p>Name: '+ name +'</p><br /><p>Massage: ' + massage + '</p>'
};
    
    
    
    
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
  res.end();
});


//error middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);