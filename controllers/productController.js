const Product = require("../models/Products");
const Categroy = require("../models/Categories");
const { validationResult } = require("express-validator");

exports.createProduct = async (req, res) => {
  //check for error in data
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, refCategory } = req.body;

  try {
    const category = Categroy.findById(refCategory);

    if (!category) {
      res.status(401).json({ msg: `Category doesn't exist` });
    }

    //Check if product is unique
    let product = await Product.findOne({ name });

    if (product) {
      return res.status(400).json({ msg: "Product already exists" });
    }
    // create a new category based on request info
    product = new Product(req.body);

    // insert category into DB
    await product.save();

    res.status(200).json({ msg: "Product created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Exist error");
  }
};

//Get all products from DB
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Exist error");
  }
};
