const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const cartmodel = require("../models/Cartmodel");
const Auth = require("../controllers/middleware/Verify");
const User = require("../controllers/middleware/userid");
const products = require("../models/Productmodel");
const usermodel = require("../models/UserModel");

router.get("/usercart", Auth, User, (req, res) => {
  const id = req.userUniqueId ? req.userUniqueId : null;

  cartmodel
    .find({ orderby: id })
    .populate("orderby")
    .then((result) => {
      if (result) {
        res.json(result);
      }
    });
});

router.post("/cart", Auth, User, (req, res) => {
  const id = req.userUniqueId ? req.userUniqueId : null;

  const product_id = req.body._id ? req.body._id : null;

  products
    .find({ _id: product_id })
    .exec()
    .then((response) => {
      if (response) {
        const addcart = new cartmodel({
          orderby: id,
          products: {
            name: req.body.name,
            img: req.body.name,
            des: req.body.des,
            price: req.body.price,
          },
        });
        addcart
          .save()
          .then((result) => {
            res.status(200).json({ message: "added" });
          })
          .catch((err) => {
            res.status(500).json({ message: "somethingwent wrong" });
          });
      } else {
        res.status(500).json({ message: "something went wrong" });
      }
    });
});

module.exports = router;
