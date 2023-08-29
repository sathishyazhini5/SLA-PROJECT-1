const mongoose = require('mongoose')
const reportSchema = new mongoose.Schema({
    patientID: String,
    data: [{
      rHand: String,
      lHand: String,
      therapist: String,
      updatedDate: String
    }]
  
  });

module.exports=mongoose.model('report',reportSchema,'report')