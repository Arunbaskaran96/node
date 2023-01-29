const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AuthToken = require("../controllers/middleware/Verify");
const UserId = require("../controllers/middleware/userid");

const carts = require("../models/Cartmodel");
const product = require("../models/Productmodel");

router.get("/userCart", AuthToken, UserId, (req, res, next) => {
  let id = req.userUniqueId ? req.userUniqueId : null;

  carts
    .find({ orderby: id })
    .populate("orderby")
    // .populate("products")
    .then((result) => {
      if (result.length > 0) {
        res.message = "Hurrah!! Cart items retrived successfully";
        res.status = 200;
        return res.json({
          success: true,
          message: "Hurrah!! Cart items retrived successfully",
          status: 200,
          count: result.length,
          data: result,
        });
      } else {
        res.message = "Notice: Kindly add Items to your cart";
        res.status = 201;
        return res.json({
          message: "Notice: Kindly add Items to your cart",
          status: 201,
          data: result,
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({
        message: "Alas!! Currently we face some internal error",
        error: error,
      });
    });
});

router.post("/cart", AuthToken, UserId, (req, res, next) => {
  //GETTING THE UNIQUR ID FROM THE REQ THAT ATTCHED BY USEID MIDDLEWARE
  //AND ATTACHING IT WITH THE REQ PARAMS ORDEREDBY TO UPDATE THE CART OF THE SPECIFIC USER
  let id = req.userUniqueId ? req.userUniqueId : null;
  // console.log(id);

  //GETTING THE PRODUCTID OF THE USER CHOOSEN PRODUCT FROM THE { REQ > PRODUCTS > PRODUCTID }
  //AND ATTACHING IT WITH THE REQ PARAMS PRODUCTS TO UPDATE THE CART OF THE SPECIFIC USER
  let productId = req.body._id ? req.body._id : null;

  // console.log(productId);
  product
    .find({ _id: productId })
    .exec()
    .then((result) => {
      // console.log(result);
      if (result.length < 1) {
        return res.status(401).json({
          message: "Alas!! We can't find any product",
          status: 401,
          data: result,
        });
      } else {
        let cart = new carts({
          orderby: id,
          productDetails: productId,
          products: {
            name: req.body.name,
            img: req.body.img,
            price: req.body.price,
            des: req.body.des,
          },
        });
        cart.save().then((result) => {
          return res.status(201).json({
            message: "Hurrah!! Item Added To cart Successfully",
            status: 200,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({
        message: "Alas!! Currently we face some internal error",
        status: 401,
        error: error,
      });
    });
});

module.exports = router;
