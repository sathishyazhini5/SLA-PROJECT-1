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
const saveFileList = async(data)=>{
    try {

     console.log(data)

     
   const patientFileListUpdate = await patientModel.findOneAndUpdate({patientID:data.patientID},
     {$set: {file:{name:data.name,url:data.url}}},{new:false,upsert:true,multi:true});


       return true;
      
    } catch (error) {

     console.log(error)
      
    }
  }

module.exports=
{
    save,
    getdata,
    updateall,
    saveFileList
}