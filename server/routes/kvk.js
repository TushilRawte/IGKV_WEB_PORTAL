const express = require("express");
const router = express.Router();
const KVKControler = require("../controllers/kvkController");

router.route("/kvklist").post(KVKControler.getKVKDetail);
router.route("/kvkdetails/:id").post(KVKControler.getIndividualKVKDetail);
router.route("/scientist").post(KVKControler.getScientistDashboard);

module.exports = router;