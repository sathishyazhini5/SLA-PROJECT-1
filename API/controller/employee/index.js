const service = require('./service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//save details
const save = async(req,res)=>
{
    try {
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password,salt)
        req.body.password = hashpassword

        const details = await service.saveEmployee(req.body)
        if(details)
        {
            res.send({
                code : 200,
                status : true,
                meassage : "Employee registered successfully"
            })
        }
        else
        {
            res.send({
                code : 400,
                status : false,
                meassage : "EmployeeId and Email already found"
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
//login
const login = async(req,res)=>
{
    try {
          empid = req.body.employeeId
          const check = await service.loginform(empid)
          if(check.length==0)
          {
            res.send({
                code : 400,
                meassage : "Employee id not found"
            })
          }
          else
          {
            const hashedpassword = check[0].password
            const details = await bcrypt.compare(req.body.password,hashedpassword)
            const token = jwt.sign({empid},process.env.JWT_SECURITY_KEY,{expiresIn : "30 minutes"})
            if(details)
            {
                res.send({
                    code : 200,
                    meassage : "Login successful",
                    Token : token
                })
            }
            else
            {
                res.send({
                    code : 400,
                    meassage : "Password incorrect"
                })
            }
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
    const get = await service.getdata(req.body)
    res.send(get)
}

//update password
const updatebymail = async(req,res)=>
{
    const update = await service.update(req.body)
    res.send("Update successfully")
}

module.exports=
{
    save,
    updatebymail,
    login,
    getdetails
}