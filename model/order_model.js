const mongoose = require("mongoose");

//note status can be either pending or delivered
const order_schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'user' ,
      required: true,
    },
    products: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true,
      }
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
        default:"pending",
        
    }
  },
  {
    timeStamps: true,
  }
);

const order = mongoose.model("product", order_schema);
module.exports = order;
