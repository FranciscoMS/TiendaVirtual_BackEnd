//Routes to authenticate users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');


//Authenticate users
//api/auth
router.post('/', 
  [
    check('email', 'Use a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.authUser
);

module.exports = router;