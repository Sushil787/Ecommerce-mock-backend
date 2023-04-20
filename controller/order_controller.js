const order = require("../model/order_model");

const get_order = async(req, res)=>{
  const id = req.id;
        try {
            const all_order = await order.find({user:id});
            return res.status(200).json(all_order);
          } catch (error) {
            return res.status(500).json({ error: error.message });
          }
      }

const create_order = async(req, res)=>{
    try{
   
    return res.status(200).json(new_order);

    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const update_order = async(req, res)=>{
    try{

    }catch(error){
        res.status(500).json({error:error.message});
    }
}


module.exports = get_order;