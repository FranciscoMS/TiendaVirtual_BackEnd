const Shopping = require("../models/Shopping");
const Product = require("../models/Products");
const { validationResult } = require("express-validator");

exports.addProduct = async (req, res) => {
  //check for error in data
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { refProduct } = req.body;

  try {
    const product = Product.findById(refProduct);

    if (!product) {
      res.status(401).json({ msg: `Product doesn't exist` });
    }

    // create a new row  based on request info
    const shopping = new Shopping(req.body);

    shopping.owner = req.user.id;

    // add the product to shopping cart
    await shopping.save();

    // get the product info associate to the shopping cart
    const resShopping = await Shopping.findById(shopping._id)
      .populate("product")
      .exec();

    res.status(200).json({ resShopping });
  } catch (error) {
    console.log(error);
    res.status(500).send("Exist error");
  }
};

//Get all products from shopping cart
exports.getProducts = async (req, res) => {
  try {
    const shoppingCart = await Shopping.find({ owner: req.user.id })
      .populate("product")
      .exec();
    res.status(200).json({ shoppingCart });
  } catch (error) {
    console.log(error);
    res.status(500).send("Exist error");
  }
};

//Update qty from shopping cart
exports.updateShopping = async (req, res) => {
  //check for error in data
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { qty } = req.body;

  const newShopping = {};

  if (qty) {
    newShopping.qty = qty;
  }

  try {
    //check id
    let shopping = await Shopping.findById(req.params.id);

    if (!shopping) {
      res.status(404).json({ msg: `Shopping don't exist` });
    }

    //Validate if have permission to update the shopping cart
    if (shopping.owner.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not Authorized" });
    }

    //Update the shopping cart
    shopping = await Shopping.findOneAndUpdate(
      { _id: req.params.id },
      { $set: newShopping },
      { new: true }
    );


    //Get the producct information associate to the shopping cart
    const resShopping = await Shopping.findById(shopping._id)
      .populate("product")
      .exec();

    res.status(200).json({ resShopping });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Exist error" });
  }
};

//Delete a product from shopping cart
exports.deleteProducto = async (req, res) => {
  try {
    //check id
    let shopping = await Shopping.findById(req.params.id);

    //check if the shipping exist
    if (!shopping) {
      res.status(404).json({ msg: `Shopping don't exist` });
    }

    //Check owner of shopping
    if (shopping.owner.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not Authorized" });
    }

    //delete shopping
    await Shopping.findOneAndRemove({ _id: req.params.id });

    res.status(200).json({ smg: "Product deleted from shopping cart" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Exist error");
  }
};
