// require mongoose
const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/contacts");

// acquire the connection (if connected successfully)
const db = mongoose.connection;

// error
db.on("error", console.error.bind(console, "connection error:"));

// check if the connection to sucessfully connected or not
db.once("open", function () {
  console.log("Connection Successfull!");
});
