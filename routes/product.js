const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const ProductSchema = new mongoose.Schema({
  description: String,
  image: String,
  pricing: Number,
  shippingCost: Number
});

const Product = mongoose.model('Product', ProductSchema);

router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


