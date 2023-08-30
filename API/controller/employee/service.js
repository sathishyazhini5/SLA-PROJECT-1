const employeemodel = require('../../model/employee')
//emp-save
const exmployeesave = async(data)=>
{
    const match = await employeemodel.aggregate([{$match:{mailId:data.mailId}}])
    if(match==0)
    {
        const saveemp = await new employeemodel(data)
        const details = await saveemp.save()
        return details
    }
    else{
        return false
    }
    
    
}
//emp-login
const login = async(data)=>
{
    const mailmatch = await employeemodel.aggregate([{$match:{mailId:data}}])
    return mailmatch
}
//update hashed password in database
const update = async(data)=>
{
    const find = await employeemodel.updateOne({mailId:data.mailId},{password:data.password})
    return find
}


//update all employee details
const updateall = async(data)=>
{
    const updatedata = await employeemodel.findOneAndUpdate({employeeId : data.employeeId},
        {$set : 
        {
            employeeName : data.employeeName,
            role : data.role,
            contactNumber : data.contactNumber,
            mailId : data.mailId,
            isActive : data.isActive,
            status : data.status
        }},{multi : true})
        return updatedata
}


module.exports={
    exmployeesave, login, update, updateall
}
