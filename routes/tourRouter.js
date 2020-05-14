const express = require("express");
const {
  getAllTourData,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  top5Tours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require("../controllers/tourController");
const { protect, restrictTo } = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoutes");
//ROUTERS

const tourRouter = express.Router();

//Tour Reviews
tourRouter.use("/:tourId/reviews", reviewRouter);

//Monthly PLan
tourRouter
  .route("/tour-monthly-plan/:year")
  .get(protect, restrictTo("admin", "lead-guide", "guide"), getMonthlyPlan);

//Stats
tourRouter.route("/tour-stats").get(getTourStats);

//Top 5 tours
tourRouter.route("/top-5-tours").get(top5Tours, getAllTourData);

tourRouter
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

tourRouter.route("/distances/:latlng/unit/:unit").get(getDistances);

//Get All Tours and Create a Tour
tourRouter
  .route("/")
  .get(getAllTourData)
  .post(protect, restrictTo("admin", "lead-guide"), createTour);

//Get Tour By ID , patch and delete a Tour
tourRouter
  .route("/:id")
  .get(getTourById)
  .patch(
    protect,
    restrictTo("admin", "lead-guide"),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

module.exports = tourRouter;
