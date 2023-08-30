const reportSchema= require('../../model/report')
const patientSchema= require('../../model/patient')
//save report
// const reportsave = async(data)=>
// {
//     Id= data.patientID
//     const patientid = await patientSchema.findOne({Id})
//     if(patientid.length==0){
//         const savepatient = new reportSchema(data)
//         const savedata = await savepatient.save()
//         return savedata
//     }
//     else
//     {
//         const update = await reportSchema.findOneAndUpdate({Id},{$set:{
//             data: [{
//                 rHand: data.rHand,
//                 lHand: data.lHand,
//                 therapist: data.therapist,
                
//               }]
//         }})
//         return update
//     }
// }
// const reportsave = async (data) => {
//     try{
//     const patientId = data.patientID;

//     // Check if patient exists
//     const existingPatient = await patientSchema.findOne({ patientID: patientId });

//     if (existingPatient) {
//         const update = await reportSchema.findOneAndUpdate(
//             { patientID: patientId },
//             {
//                 $push: {
//                     data: {
//                         rHand: data.rHand,
//                         lHand: data.lHand,
//                         therapist: data.therapist,
//                         updatedDate: new Date() // Use the current date
//                     }
//                 }
//             },
//             { new: true } // To get the updated document as the result
//         );

//         return true
//     } else {
//         const savedata = new reportSchema(data)
//         const savereports = await savedata.save()
//         return true
//     }
//     } catch(error){
//         return false
//     }
// };
const savePatientTableReport = async (info) => {
    try {

      const patientCheck = await reportSchema.aggregate([{$match:{patientID:info.patientID}}])

      if (patientCheck.length==0) {

        const report = new reportSchema(info);
        const saveData = await report.save();
        return true;

      } else {
        const patientTableUpdate = await patientSchema.findOneAndUpdate({patientID:info.patientID},{$push:
          {data:{rHand:info.data.rHand,lHand:info.data.lHand,therapist: info.data.therapist, updatedDate: info.data.updatedDate}}},{new:true,upsert:true,multi:true});
          return true;
      }

      
    } catch (err) {
      return false;
    }
  };

//combine two collections

// const patientreport= async(data)=>
// {
//   const getinfo = await reportSchema.aggregate([{$match:{
//     patientID:data.patientID
//   }},
// {
//   $lookup:{
//     from :'patient',
//     localField: 'patientID',
//     foreignField:'patientID',
//     as:'Report'
//   }
// },
// {$unwind:"$Report"},
// {$project:{
//   "patientID":"patientID",
//   "patientName":"$Report.patientName",
//   "age":"$Report.age",
//   "contactNumber":"$Report.contactNumber",
//   "altContactNumber":"$Report.altContactNumber",
//     "surgeryInfo":"$Report.surgeryInfo",
//     "ailments":"$Report.ailments",
//     "createdDate":"$Report.createdDate",
//     "lastUpdatedDate": "$Report:lastUpdatedDate",
//     "isActive":"$Report.isActive",
// }}])
// return getinfo
//}
const getbothcollection = async (data) => {
  const  datas  = data.patientID

  try {
   
    const patient = await patientSchema.findOne({ datas });
    
    if (!patient) {
      
      return false
    }

   
    const patientReport = await reportSchema.findOne({ datas });

    const result = {
      patient,
      patientReport,
    };

   return result
  } catch (err) {
    console.error(err);
    
  }
}
//find last updated
const getdata = async(info)=>
{
  const get = await reportSchema.find({'data.updateDate':info.updatedDate})
  return get
}

module.exports=
{
    savePatientTableReport,
    getbothcollection, getdata
}