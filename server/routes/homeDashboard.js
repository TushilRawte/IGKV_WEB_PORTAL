const express = require("express");
const router = express.Router();
const homeDashboardController = require("../controllers/homeDashboardController");

router.route("/collegeList").post(homeDashboardController.getCollegeListAndDetail);
router.route("/facultyList").post(homeDashboardController.getFacultyDetail);
router.route("/departmentListBycollege").post(homeDashboardController.getDepartmentListBycollege);
router.route("/currentStudents").post(homeDashboardController.getGenderWiseCountByDegreeDegreeTypeFacultyCollegeSubject);
router.route("/passoutStudents").post(homeDashboardController.getGenderWisePassOutCountByDegreeDegreeTypeFacultyCollegeSubject);
router.route("/visitorcount/:id").post(homeDashboardController.addVisitorCount);
router.route("/drsDashboard").post(homeDashboardController.drsDashboard);
router.route("/getLanguage/:id").get(homeDashboardController.getLanguage);
router.route("/getVistedCount").get(homeDashboardController.getVistedCount);


module.exports = router;