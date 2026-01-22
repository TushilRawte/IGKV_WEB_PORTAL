const express = require("express");
const router = express.Router();

const newsController = require("../controllers/newsController");

router.route("/TopNewsCategory/:id").post(newsController.getNewsCategory);
router.route("/TopNewsTillToday/:id").post(newsController.getTopNewsTillDate);
router.route("/getNewsDetail/:id").post(newsController.get_newsList);
router.route("/getPAttach/:id").post(newsController.get_previous_attachemt);
router.route("/getAcaCounNews/:id").post(newsController.getAcademicConsilNews);


module.exports = router;