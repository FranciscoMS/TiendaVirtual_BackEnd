//Routes to create users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

//api/products

//Add a new product
router.post('/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('description', 'Description must be at least 25 characters').isLength({ min: 25 }),
    check('qtyInventary', 'The quantity will be more than 0').isInt({ min: 1 }),
    check('price', 'The price will be more than 0').isInt({ min: 1 }),
    check('sizes', 'Please add one size to the product').isLength({ min: 1 }),
    check('sizes', 'Please add one color to the product').isLength({ min: 1 })
  ],
  auth,
  productController.createProduct
);

//Get all products
router.get('/', 
  productController.getProducts
);


module.exports = router;