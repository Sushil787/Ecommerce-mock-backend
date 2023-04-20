const cart = require("../model/cart_model");

const get_cart = async (req, res) => {
  try {
    const user_id = req.id;
    if (!user_id) {
      return res.status(400).json({ message: "no id" });
    }
    const cart_items = await cart
      .findOne({ user: user_id })
      .select("-_id -__v")
      .populate({
        path: "products.product",
        select: "-_id -__v",
        model: "product",
        options: { strictPopulate: false },
      });
    return res.status(200).json(cart_items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update_cart = async (req, res) => {
  try {
    const user_id = req.id;
    console.log(user_id);
    const item = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "no id" });
    }
    const cart_product = await cart.updateOne(
      { user: user_id },
      { $set: { "products.$.quantity": item.quantity } },
      { new: true }
    );
    res.status(200).json(cart_product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const add_cart = async (req, res) => {
  try {
    const user_id = req.id;
    console.log(user_id);
    const item = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "no id" });
    }
    const cart_item = await cart.create(
      { user: user_id, products: item },
      { new: true }
    );
    res.status(200).json(cart_item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const delete_cart = async (req, res) => {
  try {
    const user_id = req.id;
    const product_id = req.params.id;
    if (!user_id) {
      return res.status(400).json({ message: "no data" });
    }
    const updatedCart = await cart.updateOne(
      { user: user_id },
      { $pull: { products: { _id: product_id } } },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ error: "cart not found" });
    }
    res.status(200).json({ message: "item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  get_cart,
  update_cart,
  add_cart,
  delete_cart,
};

// sub schema  in node js mongoose
