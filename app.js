const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./modules/listing.js");
const ejsMate = require("ejs-mate");

app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs", ejsMate);

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Index Route
app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listings");
  }
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listing");
  }
});

// Create Route
app.post("/listings", async (req, res) => {
  try {
    const data = req.body.listing;
    if (data.image) {
      data.image = { url: data.image, filename: "listingimage" };
    }
    const newListing = new Listing(data);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating listing");
  }
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listing");
  }
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  try {
    const data = req.body.listing;
    if (data.image) {
      data.image = { url: data.image, filename: "listingimage" };
    }
    await Listing.findByIdAndUpdate(req.params.id, data, { new: true });
    res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating listing");
  }
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting listing");
  }
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/listings");
});
