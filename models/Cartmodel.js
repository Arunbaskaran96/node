const mongoose = require("mongoose");

const product = mongoose.Schema({
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

const cartSchema = mongoose.Schema({
  orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // productDetails: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "product",
  //   required: true,
  // },
  products: product,
});

module.exports = mongoose.model("cart", cartSchema);
