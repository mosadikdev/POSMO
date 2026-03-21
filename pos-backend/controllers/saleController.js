const Product = require("../models/Product");

exports.createSale = async (req, res) => {

  const { items } = req.body;

  try {

    for (let item of items) {
      await Product.findByIdAndUpdate(
        item._id,
        { $inc: { stock: -item.qty } }
      );
    }

    res.json({ message: "Sale completed" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error processing sale" });
  }
};