const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // base64 encoded string
});

module.exports = mongoose.model("Product", ProductSchema);