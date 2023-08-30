const pservice = require('../patient/service')
const multer = require('../../config/multer')

const savedata = async(req,res)=>
{try { const details = await pservice.savepatient(req.body)
    if(details)
    {
        res.send({
            code:200,
            status:true,
            message:"stored succcessfull"
        })
    }
    else{
        res.send({
            code:400,
            status:false,
            message:"details not saved"
        })
    }
    
} catch (error) {
    console.log(error)
    res.send({
        code:400,
        message:"something went wrong"
    })
    
}}

//upload image 
let uploadPatientFile = async(req, res)=>{
    try {
  
      let tempName = await multer.uploadMiddleware(req, res);
  
     console.log(req.file.originalname)
  
      if (req.file == undefined) {
        return res.status(400).send("Please upload a file!");
      } else {
  
        let name = req.file.originalname;
        let url = req.file.path;
        let patientID = req.body.patientID;
  
        let getFilesList = await pservice.saveFileList({name, url, patientID});
  
        if (getFilesList){
  
          res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
        });
      
        }
  
        }
  
      } catch(error){
        console.log(error)
        res.send({
            code:400,
            message: "something went wromg"
        })
    }}
      
// update all patient details
const updatedetails = async(req,res)=>
{
    const update = await pservice.updateall(req.body)
    res.send(update)
}

module.exports= 
{
    savedata, uploadPatientFile, updatedetails
}