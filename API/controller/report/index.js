const service = require('./service')

/*const savereport = async(req,res)=>
{
    try
    {
       const report = await service.save(req.body)
       if(report)
       {
        res.send({
            code : 200,
            message : "saved successfully"
        })
        }
        else
        {
        res.send({
            code : 400,
            message : "not saved"
        })
        }
    }
catch(error)
{
    
        console.log(error)
        res.send({
            code : 400,
            meassage : "Something went wrong"
        })
    
}
}*/
let saveTableReport = async (req, res) => {
    try {
  
      let saveTblReport = await service.savePatientTableReport(req.body);
  
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

const retrivereport = async(req,res)=>
{
    const patient = req.body.patientID
    const retrive = await service.report(patient)
    res.send(retrive)
}
const reportretrive = async(req,res)=>
{
   
    const retrive = await service.getbothcollection(req.body.patientID)
    res.send(retrive)
}

const getdetails = async(req,res)=>
{
  const get = await service.getdata(req.body)
  res.send(get)
}
module.exports=
{
    
    saveTableReport,
    retrivereport,
    reportretrive,
    getdetails
}