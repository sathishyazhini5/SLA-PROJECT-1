const service = require('./service')
const multerfile = require('../../middleware/multer')

//save patient details
const savepatient = async(req,res)=>
{
    try {
           const details = await service.save(req.body)
           if(details)
           {
            res.send({
                code : 200,
                status : true,
                meassage : "Details saved successfully"
            })
           }
           else
           {
            res.send({
                code : 400,
                status : false,
                meassage : "Details not saved"
            })
           }
    } catch (error) {
        console.log(error)
        res.send({
            code : 400,
            meassage : "Something went wrong"
        })
    }
}
//get all details
const getdetails = async(req,res)=>
{
    const get = await service.getdata()
    res.send(get)
}
//update all details
const updatedetails = async(req,res)=>
{
    const update = await service.updateall(req.body)
    res.send(update)
}
//update file
let uploadPatientFile = async(req, res)=>{
    try {
  
      let tempName = await multerfile.uploadMiddleware(req, res);
  
     console.log(req.file.originalname)
  
      if (req.file == undefined) {
        return res.status(400).send("Please upload a file!");
      } else {
  
        let name = req.file.originalname;
        let url = req.file.path;
        let patientID = req.body.patientID;
  
        let getFilesList = await service.saveFileList({name, url, patientID});
  
        if (getFilesList){
  
          res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
        });
  
        }
  
      }
    }
catch(error)
{
    console.log(error)
}
}
module.exports=
{
    savepatient,
    getdetails,
    updatedetails,
    uploadPatientFile
}

