const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
ijuyiuy655iljhf
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error:", err));

app.get("/", (req, res) => res.redirect("/listings"));

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).render("listings/error.ejs", { statusCode: 404, message: "Page not found." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong.";
  res.status(statusCode).render("listings/error.ejs", { statusCode, message });
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/listings");
});
