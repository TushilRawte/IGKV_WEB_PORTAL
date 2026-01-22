const express = require("express");
const router = express.Router();

const whoiswhoController = require("../controllers/whoiswhoController");


router.route("/Administrative/:id").post(whoiswhoController.getAdministrativeDashboardDetail);
router.route("/").post(whoiswhoController.getPostListForWhoisWho);
router.route("/details/:id").post(whoiswhoController.getEmployeeListForWhoisWho);



module.exports = router;