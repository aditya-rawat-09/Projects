const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

const Listing = require("./modules/listing.js");
const Review = require("./modules/review.js");

app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(session({
  secret: "wanderlust-secret",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error:", err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// Index Route
app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to fetch listings.");
    res.redirect("/listings");
  }
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to fetch listing.");
    res.redirect("/listings");
  }
});

// Create Route
app.post("/listings", async (req, res) => {
  try {
    const data = req.body.listing;
    if (!data || !data.title) {
      req.flash("error", "Title is required.");
      return res.redirect("/listings/new");
    }
    if (data.image) {
      data.image = { url: data.image, filename: "listingimage" };
    }
    const newListing = new Listing(data);
    await newListing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to create listing.");
    res.redirect("/listings/new");
  }
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to load edit page.");
    res.redirect("/listings");
  }
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  try {
    const data = req.body.listing;
    if (!data || !data.title) {
      req.flash("error", "Title is required.");
      return res.redirect(`/listings/${req.params.id}/edit`);
    }
    if (data.image) {
      data.image = { url: data.image, filename: "listingimage" };
    }
    const listing = await Listing.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to update listing.");
    res.redirect(`/listings/${req.params.id}/edit`);
  }
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to delete listing.");
    res.redirect("/listings");
  }
});

// ── Review Routes ──

// Create Review
app.post("/listings/:id/reviews", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
    const { comment, rating } = req.body.review;
    if (!comment || !comment.trim()) {
      req.flash("error", "Review comment cannot be empty.");
      return res.redirect(`/listings/${req.params.id}`);
    }
    if (!rating || rating < 1 || rating > 5) {
      req.flash("error", "Rating must be between 1 and 5.");
      return res.redirect(`/listings/${req.params.id}`);
    }
    const review = new Review({ comment: comment.trim(), rating });
    await review.save();
    listing.reviews.push(review._id);
    await listing.save();
    req.flash("success", "Review added!");
    res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to add review.");
    res.redirect(`/listings/${req.params.id}`);
  }
});

// Delete Review
app.delete("/listings/:id/reviews/:reviewId", async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted.");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to delete review.");
    res.redirect(`/listings/${req.params.id}`);
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("listings/error.ejs", { statusCode: 404, message: "Page not found." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong.";
  res.status(statusCode).render("listings/error.ejs", { statusCode, message });
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/listings");
});
