
const emailNotification = require('./sendEmail');
module.exports.bookAppointment = async function (req, res) {
    try {
        req = req.body
        console.log("Requeeuususuus", req)
        let sendEmail = await emailNotification.sendEmail(req)
        return { status: true, code: 200, message: "OK" }
    } catch (error) {
        console.log("Errororor", error)
        return { status: true, code: 204, message: "FAILED" }
    }
}