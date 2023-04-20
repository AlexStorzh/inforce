const Product = require('../models/Product');
const Counter = require('../models/Counter');

var express = require('express');
var router = express.Router();

/* GET products listing */
router.get('/', async (req, res) => {
  const products = await Product.find().sort({ name: 'asc', count: 'asc' });
  res.status(200).json(products);
});

/* GET product by id */
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).exec();
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json(product);
});

/* DELETE product by id */
router.delete('/:id', async (req, res) => {
  const { deletedCount } = await Product.deleteOne({ _id: req.params.id }).exec();
  if (!deletedCount) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ status: "success" });
});

/* POST product */
router.post('/', async (req, res) => {
  const product = await Product.create({
    ...req.body,
    _id: await getNextSequenceValue("productId")
  })
  res.status(201).json(product);
});

/* POST comment */
router.post('/:id/comments', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id,
    { $push: { comments: { ...req.body, _id: await getNextSequenceValue("commentId"), productId: req.params.id } } });
  res.status(201).json({ status: "success" });
});

/* DELETE comment */
router.delete('/:id/comments/:commentId', async (req, res) => {
  await Product.findByIdAndUpdate({ _id: req.params.id },
    { $pull: { comments: { _id: req.params.commentId } } })
  res.status(200).json({ status: "success" });
});

async function getNextSequenceValue(sequenceName) {
  let counter = await Counter.findById(sequenceName);
  if (!counter) {
    counter = { _id: sequenceName, seq: 1 };
    await Counter.create(counter);
  } else {
    await Counter.findByIdAndUpdate(sequenceName,
      { $inc: { seq: 1 } }
    );
  }
  return counter.seq;
}

module.exports = router;
