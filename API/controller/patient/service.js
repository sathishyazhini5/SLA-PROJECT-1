const patientModel = require('../../model/patientschema')

//save patient details with unique patientid
const save = async(data)=>
{
    
        const details = new patientModel(data)
        const info = await details.save()
        return info
} 
//get all details
const getdata = async(data)=>
{
    const get = await patientModel.find()
    return get
}
//update all details
const updateall = async(data)=>
{
    const update = await patientModel.findOneAndUpdate({patientID : data.patientID},
        {$set : {
            patientName:data.patientName,
            age:data.age,
            contactNumber:data.contactNumber,
            altContactNumber:data.altContactNumber,
            surgeryInfo:data.surgeryInfo,
            ailments:data.ailments,
            createdDate:data.createdDate,
            lastUpdatedDate: data.lastUpdatedDate,
            isActive: data.isActive
        }},{multi : true})
        return update
}

module.exports=
{
    save,
    getdata,
    updateall
}