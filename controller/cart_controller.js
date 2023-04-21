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
      if(cart_items == null){
        return res.status(200).json([]);
      }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// const update_cart = async (req, res) => {
//   try {
//     const user_id = req.id;
//     const item = req.body;
//     if (!user_id) {
//       return res.status(400).json({ message: "no id" });
//     }
//     const cart_product = await cart.updateOne(
//       { user: user_id },
//       { $set: { "products.$.quantity": item.quantity } },
//       { new: true }
//     );
//     res.status(200).json(cart_product);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

const add_update_cart = async (req, res) => {
  try {
    const user_id = req.id;
    const item = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "no id" });
    }
    const cart_item = await cart.findOne({ user: user_id });
    if (cart_item === null) {
      new_cart = await cart.create(
        { user: user_id, products: [item] },
        { new: true }
      );

      return res.status(200).json(new_cart);
    }
    for (let i = 0; i < cart_item.products.length; i++) {
      if (cart_item.products[i].product.toString() == item.product.toString()) {
        itemFound = true;
        cart_item.products[i] = item;
        await cart_item.save();
        return res.status(200).json(cart_item);
      }
    }
    cart_item.products.push(item);
    cart_item.save();
    return res.status(200).json(cart_item);
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
    await cart.findOneAndRemove({ user: user_id });

    return res.status(200).json({ message: "succesfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  get_cart,
  add_update_cart,
  delete_cart,
};

// sub schema  in node js mongoose
