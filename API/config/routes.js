const express = require("express");
const router = express.Router();
const auth = require("./auth");

const employee = require('../controller/employee/index')


let routes = (app) => {

  router.get("/", function(req, res){
    res.send("Route hit")
  });
  router.post('/saveemployee',employee.save)
  router.post('/updatepassword',employee.updatebymail)
  router.post('/login',employee.login)
  router.post('/getdata',employee.getdetails)

  app.use("/api", router);
};

module.exports = routes;