const express = require("express");

 appRouter = express.Router();


/**Test API v1.1*/

appRouter.get("/",(req, res)=>{
  console.log("api v2 called");

   return res.status(200).json({message:"API version 1.1"});
});

module.exports = appRouter;