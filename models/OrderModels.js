const mongoose = require("mongoose");

const ordermodels = mongoose.Schema({
  orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
