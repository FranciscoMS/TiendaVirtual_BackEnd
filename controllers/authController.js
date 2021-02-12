const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
  //check for error in data
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //Check if exist a user with the email login
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: `User doesn't exist` });
    }

    
    //Check user's password
    const passCorrect = await bcryptjs.compare(password, user.password);

    if (!passCorrect) {
      return res.status(400).json({ msg: 'Incorrect Password' });
    }

    //If all is valid create and sign the JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.TOPSECRET, {
      expiresIn: 86400
    }, (error, token) => {
      if (error) throw error;

      res.status(200).json({ token });
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Exist error');
  }
}

//Get aunthenticated user
exports.getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: 'Exist error' });
  }
}