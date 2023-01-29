const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:arun@cluster0.0tkui6d.mongodb.net/amazon?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Error occured");
      console.log("Sorry we got error" + err);
    } else {
      console.log("CONNECTED");
    }
  }
);
