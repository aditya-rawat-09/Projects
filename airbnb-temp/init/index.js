const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../modules/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  const count = await Listing.countDocuments();
  if (count > 0) {
    console.log("DB already has data, skipping seed.");
    mongoose.connection.close();
    return;
  }
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
  mongoose.connection.close();
};

initDB();