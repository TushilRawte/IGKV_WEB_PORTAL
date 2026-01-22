const express = require("express");
const router = express.Router();

const infrastructureController = require("../controllers/infrastructureController");


router.route("/listwithdetails/:id1/:id2").post(infrastructureController.getInstSetListWithDetails);
router.route("/listdetails/:id").post(infrastructureController.getInstitutionSetupListDetails);
router.route("/details/:id").post(infrastructureController.getInstitutionSetupTypeDetails);
router.route("/:id").post(infrastructureController.getInstitutionSetupTypeList);

module.exports = router;