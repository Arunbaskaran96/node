const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  des: {
    type: String,
  },
});

module.exports = mongoose.model("products", ProductModel);
