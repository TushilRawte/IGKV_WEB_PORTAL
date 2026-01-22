const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activityControllers");

/*Activitylist details*/
router.route("/:id").post(activityController.getActivityList);
router.route("/paging/:id").post(activityController.getActivityListWithPaging);

/*Event category List*/
router.route("/eventList/:id").post(activityController.getCategoryList);

/*Gallerylist details*/ /* also for lab,facilities,infrastructure */
// router.route("/galleryList/:id").post(activityController.getGallaryList);

/*Gallery details*/ /* also for lab,facilities,infrastructure */

router.route("/gallery_year_list/year").post(activityController.get_gallaryCategoryListByYear);

router.route("/gallery_category_list/category").post(activityController.get_gallaryCategoryList);

router.route("/galleryList/:id").post(activityController.get_GallaryList);

router.route("/galleryDetails/:id1/:id2").post(activityController.getGallaryDetail);

module.exports = router;