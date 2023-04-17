const mongoose = require("mongoose");
const userSchema = require("../model/UserModel");

const cart_schema = mongoose.Schema(
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
  },
  {
    timeStamps: true,
  }
);

const cart = mongoose.model("product", cart_schema);
module.exports = cart;
