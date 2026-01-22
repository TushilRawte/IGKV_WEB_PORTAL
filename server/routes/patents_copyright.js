const express = require("express");
const router = express.Router();

const patents_copyrightController = require("../controllers/patents_copyrightController");

// router.route("/:id").post(patents_copyrightController.getPatentCopyrightList);
router.route("/getAllPatentCopyrights/:id").get(patents_copyrightController.getAllPatentCopyrightList);
router.route("/getTechnology").get(patents_copyrightController.getTechnology);

module.exports = router;