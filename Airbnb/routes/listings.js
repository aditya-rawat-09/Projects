const express = require("express");
const router = express.Router();
const Listing = require("../modules/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Index
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// New
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show
router.get("/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews");
  if (!listing) return res.redirect("/listings");
  res.render("listings/show.ejs", { listing });
}));

// Create
router.post("/", wrapAsync(async (req, res) => {
  const data = req.body.listing;
  if (data.image) data.image = { url: data.image, filename: "listingimage" };
  await new Listing(data).save();
  res.redirect("/listings");
}));

// Edit
router.get("/:id/edit", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.redirect("/listings");
  res.render("listings/edit.ejs", { listing });
}));

// Update
router.put("/:id", wrapAsync(async (req, res) => {
  const data = req.body.listing;
  if (data.image) data.image = { url: data.image, filename: "listingimage" };
  await Listing.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.redirect(`/listings/${req.params.id}`);
}));

// Delete
router.delete("/:id", wrapAsync(async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.redirect("/listings");
}));

module.exports = router;
