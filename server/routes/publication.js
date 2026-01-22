const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicationController");

router.route("/publicationList/:id").post(publicationController.publicationList);


module.exports = router;