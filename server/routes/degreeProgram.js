const express = require("express");
const router = express.Router();

const degreeProgramController = require("../controllers/degreeProgramController");

router.route("/degreeProgramTypeData/:id").post(degreeProgramController.getDegreeProgramData);
router.route("/degreeWiseSubjectDetail/:id").post(degreeProgramController.getDegreeWiseSubjectDetail);
router.route("/degreeWiseDashboard/:id").post(degreeProgramController.degreeWiseDashboard);
router.route("/getCount/:id").post(degreeProgramController.GetStudentCountsBySession);




module.exports = router;