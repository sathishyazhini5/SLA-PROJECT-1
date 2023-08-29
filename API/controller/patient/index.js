const service = require('./service')

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
module.exports=
{
    savepatient,
    getdetails,
    updatedetails
}

