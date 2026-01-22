const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.route("/projectList/:id").post(projectController.projectList);
router.route("/getProjectSession/:id").post(projectController.getProjectSession);
router.route("/getProjectSource/:id").post(projectController.getProjectSource);
router.route("/getProjectMajor/:id").post(projectController.getProjectMajor);
router.route("/getProjectScheme/:id").post(projectController.getProjectScheme);
router.route("/getProjectforOffice/:id").post(projectController.getProjectForOffice);
router.route("/GetCurrentProjectCount").post(projectController.GetCurrentProjectCount);
router.route("/GetSearchScheme/:id").post(projectController.serchProjectSceme);



module.exports = router;



