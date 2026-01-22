const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/departmentController");

// router.post('/getDepartmentDetail', departmentController.getDepartmentDetail);
router.post('/departmentList/:id', departmentController.departmentList);
router.post('/departmentDetail/:id', departmentController.departmentDetail);
router.post('/degreeProgramList/:id', departmentController.degreeProgramList);
router.post('/departmentcount', departmentController.getDepartmentCollegeList);


module.exports = router;