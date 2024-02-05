const AWS = require('aws-sdk');
const nodemailer = require('nodemailer')


const sendMail = async (email, subject, text) => {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region:process.env.AWS_REGION
    });
    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
        SES: new AWS.SES(),
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 55,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });
     transporter.sendMail({
        from: "bot@sundaysforever.com",
        to:email,
        subject,
        html:text,
    }, (err, info) => {
        if(err) console.log('email sent failed',err)
        console.log('email sent successfully')
    });
}

module.exports = sendMail;
