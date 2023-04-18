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
    return res.status(200).json(new_product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const get_product = async (req, res) => {
  try {
    const all_product = await product.find({});
    return res.status(200).json(all_product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update_product = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, image, decs, categories, price } = req.body;
    if (!title || !image || !decs || !categories || !price) {
      return res.status(400).json({ message: "no complete data" });
    }
    const updated_product = await product.findByIdAndUpdate({_id:id},{title, image, decs, categories, price},{new:true});
    return res.status(200).json(updated_product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

const delete_product = async (req, res) => {
  try {
    const product_id = req.params.id;
    console.log(product_id);
   const id = await product.findById({_id:product_id});
    if (!id) {
      return res.status(400).json({ message: "no product with such id"});
    }
    await product.findByIdAndDelete({_id:product_id});
    return res.status(200).json({success:"Deleted product successfully"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  get_product,
  update_product,
  delete_product,
  add_product,
};
