const express = require("express");
const router = express.Router();

const viceChancellorController = require("../controllers/viceChancellorController");

router.route("/galleryList/:id").post(viceChancellorController.getGallaryDetailEmployeeWise);
router.route("/").post(viceChancellorController.VC_Desk_getDetail);
router.route("/formerVC").post(viceChancellorController.get_former_vc_List);

module.exports = router;    