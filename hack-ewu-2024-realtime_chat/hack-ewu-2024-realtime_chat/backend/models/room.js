const { Schema, model } = require("mongoose");

const roomSchema = Schema({
  images: [String],
  country: String,
  city: String,
  area: String,
  price: Number,
  location: String,
  address: String,
  title: String,
  gender: String,
  status: String,
  lat: String,
  lon: String,
  cloudImgUrl: String,
  geminiData:  String,
});

module.exports = model("Room", roomSchema);
