const mongoose = require("mongoose");
const userSchema = require("../model/UserModel");

const order_schema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
      },
      {
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    amount: {
      type: Number,
      required:true
    },
    address: {
      type: String,
      required:true
    },
    status:{
        type:String,
        
    }
  },
  {
    timeStamps: true,
  }
);

const order = mongoose.model("product", order_schema);
module.exports = order;
