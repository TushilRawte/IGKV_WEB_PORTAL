const express = require("express");
const router = express.Router();
const allStaffDetailsController = require("../controllers/allStaffDetailsController");

router.route("/empWorkshop/:id").post(allStaffDetailsController.empWorkshop);
router.route("/getEmployeeDetails/:id").post(allStaffDetailsController.getEmployeeDetails);
router.route("/getPublicationEmployeeWise/:emp_id").post(allStaffDetailsController.getPublicationEmployeeWise);
router.route("/getAllWorkshopSeminar/:emp_id").post(allStaffDetailsController.getAllWorkshopSeminar);
router.route("/getOffice").post(allStaffDetailsController.getOfficeDetails);
router.route("/getPost").post(allStaffDetailsController.getOPostDetails);
router.route("/getEmpId").post(allStaffDetailsController.getEmpDetails);
router.route("/empSearch/:id").post(allStaffDetailsController.empSearch);


module.exports = router; 
