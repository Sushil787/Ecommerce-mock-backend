const express = require("express");
const  auth_middleware  =  require("../middleware/auth_middleware");
const { login, signup } =  require("../controller/auth_controller");
const app_router = express.Router();

app_router.post("/user/login", login);
app_router.post("/user/signup", signup);
app_router.get("/cart/get", auth_middleware);
app_router.post("/cart/add", auth_middleware);
app_router.get("/product/get", auth_middleware);
app_router.post("/product/create", auth_middleware);
app_router.put("/product/update", auth_middleware);
app_router.delete("/product/delete/:id", auth_middleware);






module.exports = app_router;