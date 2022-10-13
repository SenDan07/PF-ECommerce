// get all reviews
// reviews by customer
// reviews by book
const { Router } = require("express");

const reviewControllers = require("../controllers/reviewControllers");
const { route } = require("./cartRoutes");

const router = Router();

router.get("/all-reviews", reviewControllers.fetchallReviews);

router.get("/:bookId/all-reviews", reviewControllers.fetchReviewsByBook);

router.get("/:userId/your-reviews", reviewControllers.fetchReviewsByUser);

router.post("/add-review/:bookId/:userId", reviewControllers.postNewReview);

module.exports = router;
