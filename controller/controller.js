
const checkIn = require('../model/bookCheckIn');
const table = require('../model/table');

module.exports.bookCheckIn = async function (req, res) {
    try {
        let data = await checkIn.bookAppointment(req)
        res.send(data);
    } catch (error) {
        console.log("------Controller bookCheckIn error :", error)
    }
}
// module.exports.notificationAdd = async function (req, res) {
//     try {
//         let data = await table.insertObject(req)
//         res.send(data);
//     } catch (error) {
//         console.log("------Controller bookCheckIn error :", error)
//     }
// }
// module.exports.notificationGet = async function (req, res) {
//     try {
//         let data = await table.getObject(req,res)
//         res.send(data);
//     } catch (error) {
//         console.log("------Controller bookCheckIn error :", error)
//     }
// }