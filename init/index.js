if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL=process.env.ATLASDB_URL;

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
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj, owner: "661d7e40a4163bbacb40f32e"
}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

//6617da7bb98d1b00bc6e1bd7