//Routes to create users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const shoppingController = require('../controllers/shoppingController');
const auth = require('../middleware/auth');

//api/shopping

//Add a new product to shopping cart
router.post('/', 
  auth,
  [
    check('product', 'Product is Required').not().isEmpty(),
    check('size', 'Size is Required').not().isEmpty(),
    check('color', 'Size is Required').not().isEmpty(),
    check('qty', 'The quantity will be more than 0').isInt({ min: 1 }),
  ],
  shoppingController.addProduct
);

//Get all products from shopping cart
router.get('/', 
  auth,
  shoppingController.getProducts
);

//Update shopping cart
router.put('/:id',
  auth,
  [
    check('qty', 'The quantity will be more than 0').isInt({ min: 1 }),
  ],
  shoppingController.updateShopping
);

//Delete product from shopping cart
router.delete('/:id',
  auth,
  shoppingController.deleteProducto
);


module.exports = router;