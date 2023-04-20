const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  _id: Number,
  productId: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const ProductSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  size: {
    type: Object,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  comments: [CommentSchema]
});

module.exports = mongoose.model("Product", ProductSchema);
