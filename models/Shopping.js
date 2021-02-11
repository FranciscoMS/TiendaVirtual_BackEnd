const mongoose = require('mongoose');

const ShoppingSchema = mongoose.Schema({
  qty: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Shopping', ShoppingSchema);