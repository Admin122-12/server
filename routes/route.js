let express = require('express');
let router = express.Router();
const controller = require("../controller/controller")
const table = require('../model/table');
const visit = require('../model/visitPrice');


router.post('/bookCheckIn', controller.bookCheckIn);
router.post('/addNotification', table.insertObject);
router.get('/getNotification', table.getObject);
router.post('/addVisitCharges', visit.insertVisitCharges);
router.get('/getVisitCharges', visit.getVisitCharges);

module.exports = router;