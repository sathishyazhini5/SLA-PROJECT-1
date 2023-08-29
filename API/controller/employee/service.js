const employeeModel = require('../../model/employeeschema')

//save employee details with unique employeeid and password

const saveEmployee = async(data)=>
{
    const match = await employeeModel.aggregate([{$match : {employeeId : data.employeeId}},{$match : {mailId : data.mailId}}])
    if(match==0)
    {
        const savedetails = new employeeModel(data)
        const info = await savedetails.save()
        return info
    }
    else
    {
        return false
    }
    
}
//login 
const loginform = async(data)=>
{
    const match = await employeeModel.find({employeeId : data})
    return match
}
//find all details based on empid and isActive=true
const getdata = async(data)=>
{
    const get = await employeeModel.find({isActive : data.isActive})
    return get
}
//update employee password by employeeid
const update = async(data)=>
{
    const updatepassword = await employeeModel.updateOne({mailId : data.mailId},{password : data.password})
    return updatepassword
}
//update all employee details
const updateall = async(data)=>
{
    const update = await employeeModel.findOneAndUpdate({employeeId : data.employeeId},
        {$set : 
        {
            employeeName : data.employeeName,
            role : data.role,
            contactNumber : data.contactNumber,
            mailId : data.mailId,
            isActive : data.isActive,
            status : data.status
        }},{multi : true})
        return update
}

module.exports=
{
    saveEmployee,
    update,
    loginform,
    getdata,
    updateall
}