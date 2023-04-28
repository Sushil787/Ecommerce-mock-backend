const express = require("express");
const auth_middleware = require("../../middleware/auth_middleware");
const { sign, signup } = require("../../controller/auth_controller");
const logger  = require("../../utils/logger");

const {
  get_cart,
  delete_cart,
  add_update_cart
} = require("../../controller/cart_controller");
const {
  get_order,
  add_order,
  update_order,
  get_all_order
} = require("../../controller/order_controller");
const {
  add_product,
  get_product,
  update_product,
  delete_product
} = require("../../controller/product_controller");
const role_check = require("../../middleware/role_middleware");
const app_router = express.Router();

/**Test API v1.0*/
app_router.get("/",(req,res)=>{
  try {
    console.log("api v1 called");
    logger.info("connection success api v1 called");
return res.status(200).json({message:"Api verson 1.0"});
  } catch (e) {
    logger.error();(e.message);
    
 }
});
/**  auth route bloc */
app_router.post("/user/login", sign);
app_router.post("/user/signup", signup);

/** cart route bloc */
app_router.get("/cart", auth_middleware, get_cart);
app_router.post("/cart", auth_middleware, add_update_cart);
app_router.delete("/cart/:id", auth_middleware, delete_cart);

/** product route bloc */
app_router.get("/product", auth_middleware, get_product);
app_router.post("/product", auth_middleware, role_check, add_product);
app_router.put("/product/:id", auth_middleware, role_check, update_product);
app_router.delete("/product/:id", auth_middleware, role_check, delete_product);

/** order route bloc */
app_router.get("/order", auth_middleware, role_check, get_all_order);
app_router.get("/order", auth_middleware, get_order);
app_router.post("/order", auth_middleware, add_order);
app_router.put("/order", auth_middleware, role_check, update_order);

module.exports = app_router;
