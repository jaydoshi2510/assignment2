const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const CommentSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  images: [String],
  text: String
});

const Comment = mongoose.model('Comment', CommentSchema);

router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;