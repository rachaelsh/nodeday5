var mongoose = require("mongoose");

var carSchema = new mongoose.Schema({
  year: Number,
  model: String,
  make: String
});

module.exports = mongoose.model("Cars", carSchema);
