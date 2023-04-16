
const checkIn = require('../model/bookCheckIn');

module.exports.bookCheckIn = async function (req, res) {
    try {
        let data = await checkIn.bookAppointment(req)
        res.send(data);
    } catch (error) {
        console.log("------Controller bookCheckIn error :", error)
    }
}