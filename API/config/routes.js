const express = require("express");
const router = express.Router();
const auth = require("./auth");

let routes = (app) => {

  router.get("/", function(req, res){
    res.send("Route hit")
  });

  app.use("/api", router);
};

module.exports = routes;