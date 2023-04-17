const mongoose = require("mongoose");
const userSchema = require("../model/UserModel");

const product_schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },

    decs: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const product = mongoose.model("product", product_schema);
module.exports = product;
