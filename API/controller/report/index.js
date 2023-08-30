const rservice = require('./service')
// const reportsve = async(req,res)=>
// {
//     try {
//         const savedata = await rservice.reportsave(req.body)
//         if(!savedata)
//         {
//             res.send({
//                 code:200,
//                 status: true,
//                 message:"report saved"
//             })
//         }
//         else{
          
//         }
        
//     } catch (error) { console.log(error)
//         res.send({
//             code:400,
//             message: "something went wromg"
//         })
        
//     }
// }

// const savereport = async(req,res)=>
// {
//     const savedata = await rservice.reportsave(req.body)
//     res.send("updated")
    
// }
let saveTableReport = async (req, res) => {
    try {
  
      let saveTblReport = await rservice.savePatientTableReport(req.body);
  
      if (saveTblReport) {
        res.send({
          code: 200,
          Message: "Report Added Successfully",
        });
      } else {
        res.send({
          code: 400,
          Message: "Problem Occured",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
//patient report
// const report = async(req,res)=>
// {
//   const combine = await rservice.patientreport(req.body.patientID)
//   res.send(combine)
// }
//combine two collection
const retrivereport = async(req,res)=>
{
    // const patient = req.body.patientID
    const retrive = await rservice.getbothcollection(req.body.patientID)
    res.send(retrive)
}
//find last updated
const fetchdata = async(req,res)=>
{
  const fetch = await rservice.getdata(req.body)
  res.send(fetch)
}
module.exports={ saveTableReport, retrivereport, fetchdata
}