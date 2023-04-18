const product = require("../model/product_model");

const add_product = async (req, res) => {
  try {
    const { title, image, decs, categories, price } = req.body;
    if (!title || !image || !decs || !categories || !price) {
      return res.status(400).json({ message: "no complete data" });
    }
    const new_product = await product.create({
      title,
      image,
      decs,
      categories,
      price,
    });
    return res.status(200)
.json(new_product)  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = add_product;
