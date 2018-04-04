var express = require('express');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var cors = require('cors');
var path = require('path');
var port = process.env.PORT || 8000;
app.use(cors())
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: '',
    pass: ''
  }
}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,"public")));

app.post("/email",function(req,res)
    {
        var mailOptions = 
        {
         // sender address
          to: req.body.to, // list of receivers
          subject:req.body.subject, // Subject line
          text: req.body.message// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) 
        {
        if (err) 
          {
            console.log(err);
            console.log(req.body);
            res.statuscode = 200;
            res.write(err);
            res.end();
          } 
       
            console.log(req.body);
            res.statuscode = 200;
            res.write("hello");
            res.end();
            console.log('Email sent: ' + info.response);
                  
            transporter.close();
});
});
app.listen(port);