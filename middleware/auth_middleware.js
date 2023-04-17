// const user = require("../model/user_model");
const jwt = require("jsonwebtoken");


const auth_middleware = async (req, res, next) => {
  try {
    const token = req.headers('authorization').split(" ");
    const bearer = token[1];
   const verify =  jwt.verify(token, process.env.SECRET_KEY);
   if(verify){
    next();

    return;
   }
   res.status(401).json({error:"uauthorized"});

  
  } catch (error) {
    res.status().json({ error: error.message });
  }
};

module.exports = auth_middleware;
