const express = require("express");
const router = express.Router();
const auth = require("./auth");
const employee = require('../controller/employee/index')
const patient = require('../controller/patient/index')
const report = require('../controller/report/index')

let routes = (app) => {

  router.get("/", function(req, res){
    res.send("Route hit")
  });
  router.post('/saveemp', employee.save )
  router.post('/emplogin', employee.loginmatch)
  router.post('/updatepassword', employee.updatepassword)
  router.post('/updateall', employee.updatemany)

  router.post('/updateall', patient.updatedetails )
  router.post('/savepatient', patient.savedata )
  router.post('/savereport',report.saveTableReport)
  router.post('/report', report.retrivereport)
  router.post('/uploadiamge', patient.uploadPatientFile)
  router.post('/fetch', report.fetchdata)

  app.use("/api", router);
};

module.exports = routes;