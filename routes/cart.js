const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const CartSchema = new mongoose.Schema({
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Cart = mongoose.model('Cart', CartSchema);

router.post('/', async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
 