const patientSchema= require('../../model/patient')

const savepatient =  async(data)=>
{
    const savepatient = new patientSchema(data)
    const savedata = await savepatient.save()
    return savedata
}
//update image file
const saveFileList = async(data)=>{
    try {

     console.log(data)

     
   const patientFileListUpdate = await patientSchema.findOneAndUpdate({patientID:data.patientID},
     {$push: {file:{name:data.name,url:data.url}}},{new:false,upsert:true,multi:true});


       return true;
      
    } catch (error) {

     console.log(error)
      
    }
  }
//update patient details
const updateall = async(data)=>
{
    const update = await patientSchema.findOneAndUpdate({patientID : data.patientID},
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
    savepatient, saveFileList, updateall
}