const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  shippingAddress: String
});

const User = mongoose.model('User', UserSchema);

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    let hasUser = await User.findOne({ email });
    if (hasUser) {
        return res.status(400).json({ message: 'User already exists, add different User' });
    }
    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;