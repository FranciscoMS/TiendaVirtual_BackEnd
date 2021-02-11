//Routes to create users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');


//Add a new category
//api/categories
router.post('/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('description', 'Description must be at least 25 characters').isLength({ min: 25 })
  ], 
  auth,
  categoryController.createCategory
);

module.exports = router;