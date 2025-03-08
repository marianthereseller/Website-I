

function send()
{
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sprinkmaros@gmail.com',
      pass: '810412Sipka'
    }
  });

  var mailOptions = {
    from: 'sprinkmaros@gmail.com',
    to: 'majkosipka1@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}