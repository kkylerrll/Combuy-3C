require('dotenv').config()
const nodemailer = require('nodemailer')

const loginMail = function async(req) {
  if (req.session.member.verified == 0) {
    return
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: req.session.member.mail,
    subject: '你已成功登入ComBuy',
    text: '你已成功登入ComBuy',
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err)
      // res.status(500).send('Error sending email')
      return
    } else {
      console.log(info)
      // res.send('Email sent')
    }
  })
}

module.exports = {
  loginMail,
}
