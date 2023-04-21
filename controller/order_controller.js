const order = require("../model/order_model");

/**Here get all route is for admin which is be checked via  */
/**admin will have access to get all order, update order */
/**for normal user it will have access to get their personal order only */

const get_order = async (req, res) => {
  try {
    const user_id = req.id;
    if (!user_id) {
      return res.status(400).json({ message: "no id" });
    }
    const order_items = await order
      .findOne({ user: user_id })
      .select("-_id -__v")
      .populate({
        path: "products.product",
        select: "-_id -__v",
        model: "product",
        options: { strictPopulate: false },
      });
    if (order_items == null) {
      return res.status(200).json([]);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// for admin get all order is required
const get_all_order = async (req, res) => {
  try {
    const order_items = await order.find({});
    if (order_items == null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(order_items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// for adding order
const add_order = async (req, res) => {
  try {
    const user_id = req.id;
    const { products, amount, address, status } = req.body;
    if (!user_id || !products || !amount || !address || !status) {
      return res.status(400).json({ message: "no complete data" });
    }
    const order_itemm = await order.findOne({user:user_id});
    
    if(order_itemm){
      return res.status(200).json({message:"item is already ordered, we will notify you soon"});
    }
    console.log("i am here22");
    

    const order_item = await order.create({
      user: user_id,
      products: [...products],
      amount: amount,
      address: address,
      status: status,
    });
    
    return res.status(200).json(order_item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// updating urder by admin
const update_order = async (req, res) => {
  try {

    const {user, status} = req.body;
    console.log(user, status);
    if (!user) {
      return res.status(400).json({ message: "no id" });
    }
    const order_item = await order.findOneAndUpdate(
      { user },
      { status },
      { new: true }
    );
    if(order){
      return res.status(200).json(order_item);
      
    }else {
      return res.status(404).json({ error: "Order not found" });
    }
    // const order_item = await order.find({ user });
    // console.log(order_item);
    // if (order_item === null) {
    //   return res.status(200).json({ message: "you have not ordered any item of this type" });
    // }
    // order_item.status = status;
    // await order_item.save();
    // return res.status(200).json(order_item);
    
    // // for (let i = 0; i < order_item.products.length; i++) {
    // //   if (
    // //     order_item.products[i].product.toString() == item.product.toString()
    // //   ) {
    // //     order_item.products[i] = item;
    // //     await order_item.save();
    // //     return res.status(200).json(order_item);
    // //   }
    // // }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// order can be deleted after delivered.
// const delete_order = async (req, res) => {
//   try {
//     const user_id = req.id;
//     if (!user_id) {
//       return res.status(400).json({ message: "no data" });
//     }
//     await order.findOneAndRemove({ user: user_id });

//     return res.status(200).json({ message: "succesfully deleted order" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  get_order,
  update_order,
  add_order,
  get_all_order,
};
