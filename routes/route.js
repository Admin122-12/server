let express = require('express');
let router = express.Router();
const controller = require("../controller/controller")


router.post('/bookCheckIn', controller.bookCheckIn);

module.exports = router;