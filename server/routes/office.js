const express = require("express");
const router = express.Router();
const officeController = require("../controllers/officeController");


router.route("/:id").post(officeController.getOfficeDetail);


module.exports = router;