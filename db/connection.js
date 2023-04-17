const mongoose = require("mongoose");
const express = require("express");
const app = express();

const PORT = process.env.PORT | 3000;

 mongoose_connection = ()=>{
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
 }

  module.exports = mongoose_connection;

  ///dai how to use this connection in index.js file and use it for connection