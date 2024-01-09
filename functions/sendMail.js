// https://javascript.plainenglish.io/sending-emails-with-nodemailer-in-next-js-ccada06abfc9
//
var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export default async function sendMail(subject, toEmail, htmlMsg) {

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from    : process.env.NODEMAILER_EMAIL,
    to      : toEmail,
    subject : subject,
    html    : htmlMsg,
  };

   // https://stackoverflow.com/questions/65631481/nodemailer-in-vercel-not-sending-email-in-production
   //
   console.log ("sendMail before transporter.sendMail to ", toEmail);
   let response = await transporter.sendMail(mailOptions);
   console.log ("functions/sendMail.js : transporter.sendMail respone : ", response);
   return true;
}
