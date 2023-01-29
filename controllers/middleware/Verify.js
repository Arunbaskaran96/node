const jwt = require("jsonwebtoken");
const secret = "Arun";

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const verify = jwt.verify(req.headers.authorization, secret);
    // console.log(verify);

    if (verify) {
      req.Token = verify;
      next();
    } else {
      res.status(500).json({ message: "verify Auth failed" });
    }
  } else {
    res.status(500).json({ message: "Auth failed" });
  }
};
