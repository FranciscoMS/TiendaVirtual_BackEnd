const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //check for error in data
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //Check if user is unique
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email" });
    }
    // create a new user based on request info
    user = new User(req.body);

    //Encrypt password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // insert user into DB
    await user.save();

    //Create and sign the JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.TOPSECRET,
      {
        expiresIn: 86400,
      },
      (error, token) => {
        if (error) throw error;

        res.status(200).json({ token });
      }
    );

    //res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Exist error");
  }
};
