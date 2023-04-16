const express = require("express");
const appRouter = require("./router/app_router");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT | 3000;
const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected success");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(appRouter);
