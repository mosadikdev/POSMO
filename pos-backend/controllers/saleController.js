const Product = require("../models/Product");

exports.createSale = async (req, res) => {
  const { items } = req.body;

  try {

    for (let item of items) {

      const product = await Product.findById(item._id);

      if (!product) continue;

      if (product.stock <= 0) continue;

      const newStock = product.stock - item.qty;

      product.stock = newStock < 0 ? 0 : newStock;

      await product.save();
    }

    res.json({ message: "Sale completed" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error processing sale" });
  }
};