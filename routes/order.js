const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  totalCost: Number,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);


router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(200).send(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;