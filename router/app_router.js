const express = require("express");
const  auth_middleware  =  require("../middleware/auth_middleware");
const { login, signup } =  require("../controller/auth_controller");
const app_router = express.Router();

app_router.post("/user/login", auth_middleware, login);
app_router.post("/user/signup", auth_middleware, signup);
app_router.get("/product/allProduct");




module.exports = app_router;