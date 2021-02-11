//Routes to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');


//Add a new user
//api/users
router.post('/', 
  [
    check('name', 'Name field is required').not().isEmpty(),
    check('lastName', 'Last Name field is required').not().isEmpty(),
    check('email', 'Use a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ], 
  userController.createUser
);

module.exports = router;