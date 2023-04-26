const express = require("express");
const appRouterVerson1 = require("./router/V1.0/app_router");
const appRouterVersion2 = require("./router/V1.1/app_router");
// const cors = require("cors");
const morgan = require('morgan');
require("dotenv").config();
const mongoose_connection = require("./db/connection");
const app = express();
// app.use(cors({
//     origin:"www.xyz.com",
//     methods:['GET','POST','PUT','DELETE'],
// }));
mongoose_connection(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev')); // 'dev' is the predefined format for Morgan, you can also use other formats
app.use("/v1.0",appRouterVerson1);
app.use("/v1.1", appRouterVersion2);


