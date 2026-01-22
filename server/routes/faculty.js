const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");

router.route('/facultyWiseDetail/:id').post(facultyController.facultyWiseDetail);
router.route('/facultyDashboard/:id').post(facultyController.facultyDashboard);
router.route('/ProgramListInFaculty/:id').post(facultyController.ProgramListInFaculty);

module.exports = router;