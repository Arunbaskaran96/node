const express = require("express");
const server = express();

const app = require("./app");
server.use("/", app);

require("./configuration/Configure");
server.listen(8000);
