const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");

router.route("/CollegeTypeList/:id").post(collegeController.CollegeTypeList);
router.route("/collegeDetails/:id").post(collegeController.collegeDetails);
router.route("/getDepartmentDetail/:id").post(collegeController.getDepartmentDetail);

module.exports = router;