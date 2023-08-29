const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
    patientName:String,
    patientID:String,
    age:String,
    contactNumber:String,
    altContactNumber:String,
    surgeryInfo:String,
    ailments:String,
    createdDate:String,
    lastUpdatedDate: String,
    isActive: Boolean,
    file: [{
      name: String,
      url: String
    }]
  });

module.exports=mongoose.model('patient',patientSchema,'patient')