const mongoose = require("mongoose");
const express = require("express");

const PORT = process.env.PORT | 3001;

 mongoose_connection = (app)=>{
  mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected success");

    app.listen(PORT, '0.0.0.0',() => {
      console.log(`listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
 }

  module.exports = mongoose_connection;

