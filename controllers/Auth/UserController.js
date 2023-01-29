const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const Users = require("../../models/UserModel");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      _id: new mongoose.Types.ObjectId(),
      phone: req.body.phone,
      address: req.body.address,
    });

    await user.save();
    res.status(200).json({ message: "created" });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
    console.log(error);
  }
});

module.exports = router;
