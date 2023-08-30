const mongoose= require('mongoose')
let employeeSchema = new mongoose.Schema({
    employeeId:{
        type: String,
        unique: true
    },
    employeeName:String,
    password:String,
    role: String,
    contactNumber: String,
    mailId: String,
    isActive: Boolean,
    status: String,
    CreatedDate: String,
    lastUpdatedDate: String
})

module.exports= mongoose.model('employee', employeeSchema)