const mongoose = require("mongoose");

// Define schema
const clothingProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  materials: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model
const ClothingProduct = mongoose.model('ClothingProduct', clothingProductSchema);

module.exports= ClothingProduct;