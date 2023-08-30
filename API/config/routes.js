const express = require("express");
const router = express.Router();
const auth = require("./auth");
const multer = require('multer')

const employee = require('../controller/employee/index')
const patient = require('../controller/patient/index')
const report = require('../controller/report/index')


let routes = (app) => {

  router.get("/", function(req, res){
    res.send("Route hit")
  });
  router.post('/saveemployee',employee.save)
  router.post('/updatepassword',employee.updatebymail)
  router.post('/login',employee.login)
  router.post('/getdata',employee.getdetails)
  router.post('/updateall',employee.updatemany)

  router.post('/savepatient',patient.savepatient)
  router.post('/getdetails',patient.getdetails)
  router.post('/updatedetails',patient.updatedetails)
  router.post("/uploadFiles", patient.uploadPatientFile)
  

  router.post('/savereport',report.saveTableReport)
  router.post('/retrive',report.retrivereport)
  router.post('/report',report.reportretrive)
  router.post('/getbydate',report.getdetails)

  app.use("/api", router);
};

module.exports = routes;