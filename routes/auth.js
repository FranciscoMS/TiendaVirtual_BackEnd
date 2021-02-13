//Routes to authenticate users
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//Authenticate users login
//api/auth
router.post("/", authController.authUser);

//Get authenticated user
router.get("/", auth, authController.getAuthUser);

module.exports = router;
