const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Read token from header
  const token = req.header("x-auth-token");

  //Check for token
  if (!token) {
    return res.status(401).json({ msg: "Permiss not valid, no token exists" });
  }

  //Validate token
  try {
    const validate = jwt.verify(token, process.env.TOPSECRET);
    req.user = validate.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
