const express = require("express");
const auth_middleware = require("../middleware/auth_middleware");
const { sign, signup } = require("../controller/auth_controller");
const { get_cart, delete_cart, add_update_cart, add_cart, update_cart } = require("../controller/cart_controller");
const {add_product, get_product, update_product, delete_product} = require("../controller/product_controller");
const app_router = express.Router();

/**  auth route bloc */
app_router.post("/user/login", sign);
app_router.post("/user/signup", signup);


/** cart route bloc */
app_router.get("/cart", auth_middleware, get_cart);
app_router.post("/cart", auth_middleware,add_cart );
app_router.put("/cart", auth_middleware,update_cart );
app_router.delete("/cart/:id", auth_middleware, delete_cart);


/** product route bloc */
app_router.get("/product", auth_middleware, get_product);
app_router.post("/product", auth_middleware, add_product);
app_router.put("/product/:id", auth_middleware, update_product);
app_router.delete("/product/:id", auth_middleware, delete_product);


/** order route bloc */
app_router.get("/order",auth_middleware,);
app_router.post("/order",auth_middleware,);
app_router.put("/order",auth_middleware,);
app_router.delete("/order",auth_middleware,);




module.exports = app_router;
