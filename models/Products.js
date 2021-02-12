const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description:{
    type: String,
    required: true,
    trim: true,
  },
  qtyInventory: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },
  sizes: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Products', ProductSchema);