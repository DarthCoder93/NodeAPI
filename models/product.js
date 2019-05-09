const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  description: String,
  imgUrl: {
    type: String,
    required: true
  },
  price:  {
      type: Number,
      required: true
  },
  discount: Number,
  designedFor: { 
    type: String, 
    enum: ['Men', 'Women','Girl','Boy','Infant'], 
    required: true
  },
  category: {
     type: String,  
     enum: [
      "Sneakers",
      "Sandals",
      "Heels",
      "Boots",
      "Flats",
      "Floral",
      "Casual",
      "Casual Shoes",
      "Shoes",
      "Skate & Fashion",
      "Mid & High Tops",
      "Loafers"
     ],
     required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand'
  }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
