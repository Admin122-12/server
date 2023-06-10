var nodemailer = require('nodemailer');
module.exports.sendEmail = async function (req, res) {
    try {
        console.log("req sendEmail", req)

        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'rajeshvish519@gmail.com',
                pass: 'bKQ5BpC2axvs3h6n'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'rajeshvish519@gmail.com', // sender address
            to: 'avivish59@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world? ', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("send mail Error", error);
                return { status: true, code: 200, message: "OK", data: error }
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return { status: true, code: 200, message: "OK", data: nodemailer.getTestMessageUrl(info) }
        });


    } catch (error) {
        console.log("Errr sendEmail", error)
        return { status: true, code: 200, message: "FAILED" }
    }
}