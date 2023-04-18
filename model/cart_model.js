const mongoose = require("mongoose");

const cart_schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      required: true,
    
    },
    products: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
      }
    ],
    quantity:{
      type:String,
      required:true,
      default:1,
    }
  },
  {
    timeStamps: true,
  }
);

const cart = mongoose.model("cart", cart_schema);
module.exports = cart;
