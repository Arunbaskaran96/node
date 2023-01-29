const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserModel = schema({
  name: {
    type: String,
    required: true,
  },
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
    required: true,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
  },
  previousorders: [mongoose.Schema.Types.ObjectId],
  wishlist: [mongoose.Schema.Types.ObjectId],
  phone: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", UserModel);
