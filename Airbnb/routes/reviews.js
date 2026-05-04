const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../modules/listing.js");
const Review = require("../modules/review.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Create Review
router.post("/", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.redirect("/listings");
  const review = new Review(req.body.review);
  await review.save();
  listing.reviews.push(review._id);
  await listing.save();
  res.redirect(`/listings/${req.params.id}`);
}));

// Delete Review
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}));

module.exports = router;
