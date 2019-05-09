const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  imgUrl: String,
});

const Brand = mongoose.model("brand", brandSchema);

module.exports = Brand;
