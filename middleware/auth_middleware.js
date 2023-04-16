const user = require("../model/user_model");


const auth_middleware = async (req, res, next) => {

  try {

   
    next();
  } catch (error) {
    res.status().json({ error: error.message });
  }
};

module.exports = auth_middleware;
