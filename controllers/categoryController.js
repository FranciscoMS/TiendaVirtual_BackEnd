const Category = require('../models/Categories');
const { validationResult } = require("express-validator");

exports.createCategory = async (req, res) => {

  //check for error in data
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  try {

    //Check if user is unique
    let category = await Category.findOne({ name });

    if (category) {
      return res.status(400).json({ msg: 'Category already exists' });
    }
    // create a new category based on request info
    category = new Category(req.body);

    // insert category into DB
    await category.save();

    res.status(200).json({ msg: "Category created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send('Exist error');
  }
}