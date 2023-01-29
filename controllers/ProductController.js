const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Products = require("../models/Productmodel");
const valid = require("./middleware/Verify");
//create products
router.post(
  "/product",

  (req, res) => {
    const product = new Products({
      name: req.body.name,
      img: req.body.img,
      des: req.body.img,
      price: req.body.price,
    });
    product
      .save()
      .then((response) => {
        res.status(200).json({
          message: "created",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "something went wrong",
          error: err,
        });
      });
  }
);
//get all the products
router.get("/products", valid, (req, res) => {
  Products.find()
    .then((reponse) => {
      if (reponse.length > 0) {
        res.status(200).json(reponse);
      } else {
        res.status(200).json({ message: "no data found", data: response });
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).json({ message: "something went wrong" });
      }
    });
});
//update based on id
router.put("/product/:id", (req, res) => {
  Products.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((response) => {
      res.status(200).json({ message: "updated" });
    })
    .catch((err) => {
      res.status(400).json({ message: "something went wrong" });
    });
});
//for update all
router.put("/product", (req, res) => {
  Products.updateMany(req.body)
    .then((response) => {
      res.status(200).json({ message: "updated" });
    })
    .catch((err) => {
      res.status(400).json({ message: "something went wrong" });
    });
});

router.post("/search", (req, res) => {
  const searchterm = req.body.searchterm;

  Products.find({ name: searchterm }).then((result) => {
    if (result.length > 0) {
      res
        .status(200)
        .json({ message: "fetched successfully ", data: result })
        .catch((error) => {
          res.status(500).json({ message: "something went wrong" });
          console.log(error);
        });
    } else {
      res.status(200).json({ message: "no products found" });
    }
  });
});

module.exports = router;
