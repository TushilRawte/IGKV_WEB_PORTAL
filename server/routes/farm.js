const express = require("express");
const router = express.Router();
const FarmControllers = require("../controllers/FarmControllers");

router.route("/:id").post(FarmControllers.getFarmProduct);
router.route("/getFarmerSuccessStory/:id").post(FarmControllers.getFarmerSuccessStory);
router.route("/farmCount").get(FarmControllers.getFarmDashboard);
router.route("/getResFarm/:id").post(FarmControllers.getReserchStation_Farm);



module.exports = router; 