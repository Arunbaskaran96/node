const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(bodyparser.json());
app.use(cors());
const ProductController = require("./controllers/ProductController");
const UserController = require("./controllers/Auth/UserController");
const signin = require("./controllers/Auth/SigninController");
const cartcontroller = require("./controllers/Cartcontroller");
// const cartcontroller = require("./controllers/Cart.controller");
app.use("/", ProductController);
app.use("/", UserController);
app.use("/", signin);
app.use("/", cartcontroller);
module.exports = app;