const reportModel = require('../../model/reportschema')
const patientModel = require('../../model/patientschema')
//save
/*const save = async(data)=>
{
    
        const details = new reportModel(data)
        const info = await details.save()
        return info
    
}*/
 const savePatientTableReport = async (info) => {
    try {
     
      const patientCheck = await reportModel.aggregate([{$match:{patientID:info.patientID}}])
      
      if (patientCheck.length==0) {

        const report = new reportModel(info);
        const saveData = await report.save();
        return true;

      } else {
        const patientTableUpdate = await reportModel.findOneAndUpdate({patientID:info.patientID},{$push:
          {data:{rHand:info.data.rHand,lHand:info.data.lHand,therapist: info.data.therapist, updatedDate: info.data.updatedDate}}},{new:true,upsert:true,multi:true});
          return true;
      }

      
    } catch (err) {
      return false;
    }
  };
//combine two collections
const report = async(data)=>
{
    const getinfo = await reportModel.aggregate([
        {$match : {patientID : data.patientID}},
        {
            $lookup: {
                from: 'patient', //collection name in robo3t
                localField: 'patientID',
                foreignField: 'patientID',
                as: 'report'
            }
        },
        { $unwind: "$report" },
        {
            $project: {
                "patientName": "$report.patientName",
                "patientID": "$patientID",
                "age": "$report.age",
                "contactNumber": "$report.contactNumber",
                "surgeryInfo": "$report.surgeryInfo",
                "ailments": "$report.ailments",
                "data": [{
                    "rHand": "$rHand",
                    "lHand": "$lHand",
                    "therapist": "$therapist"
                
            }]}
        }
    ])
    return getinfo

}
const getbothcollection = async (data) => {
  const  datas  = data.patientID

  try {
   
    const patient = await patientModel.findOne({ datas });
    
    if (!patient) {
      
      return false
    }

   
    const patientReport = await reportModel.findOne({ datas });

    const result = {
      patient,
      patientReport,
    };

   return result
  } catch (err) {
    console.error(err);
    
  }
}
//get details
const getdata = async(info)=>
{
  const get = await reportModel.find({'data.updatedDate' : info.updatedDate})
  return get
}
//delete particular details by patientid
const deletebyid = async(data)=>
{
  const deletedata = await reportModel.findOneAndDelete({patientID : data.patientID})
  return deletedata
}

module.exports=
{
    
    savePatientTableReport,
    report,
    getbothcollection,
    getdata,
    deletebyid
}