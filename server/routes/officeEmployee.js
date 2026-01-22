const express = require("express");
const router = express.Router();

const officeEmployeeController  = require("../controllers/officeEmployeeController");

router.route("/:id").post(officeEmployeeController.getEmployeeListFromOffice);

module.exports = router;
