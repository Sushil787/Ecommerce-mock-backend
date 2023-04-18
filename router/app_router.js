const express = require("express");
const auth_middleware = require("../middleware/auth_middleware");
const { login, signup } = require("../controller/auth_controller");
const { get_cart, add_cart } = require("../controller/cart_controller");
const add_product = require("../controller/product_controller");
const app_router = express.Router();

app_router.post("/user/login", login);
app_router.post("/user/signup", signup);
app_router.post("/cart/get", auth_middleware, get_cart);
app_router.post("/cart/create", auth_middleware, add_cart);
// app_router.post("/cart/add", auth_middleware);
// app_router.get("/product/get", auth_middleware);
app_router.post("/product/create", auth_middleware, add_product);
// app_router.put("/product/update", auth_middleware);
// app_router.delete("/product/delete/:id", auth_middleware);

module.exports = app_router;
