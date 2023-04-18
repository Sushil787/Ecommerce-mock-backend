const cart = require("../model/cart_model");

const get_cart = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user) {
      return res.status(400).json({ message: "no user" });
    }
    const user_cart = await cart
      .find({ user })
      .populate("user")
      .populate("product");
    return res.status(200).json(user_cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const add_cart = async (req, res) => {
  try {
    const {user, products, quantity } = req.body;
    if(!user || !products || !quantity){
        return res.status(400).json({message:"no data"});
    }
    const create_cart = await cart.create({user, products,quantity});
    res.status(200).json(create_cart);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    get_cart,
    add_cart
};
