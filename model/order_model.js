const mongoose = require("mongoose");
const order_schema = mongoose.Schema(
  {
    userId: {
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
        
    }
  },
  {
    timeStamps: true,
  }
);

const order = mongoose.model("product", order_schema);
module.exports = order;
