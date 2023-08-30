const eservice= require('./service')
const bcyrpt = require('bcrypt')
const jwt =  require('jsonwebtoken')
const save = async(req,res)=>
{
    try{
    const salt= await bcyrpt.genSalt(10)
    
    const hashed = await bcyrpt.hash(req.body.password, salt)
    req.body.password = hashed

    const details= await eservice.exmployeesave(req.body)
    if(details)
    {   res.send({
        code:200,
        message:"stored successfully"})
    }
    else{
        res.send({
            code:400,
            message:"already exists"})
    }

    }
    catch(error){
        console.log(error)
        res.send({
            code:400,
            message: "something went wromg"
        })
    }
}
//login 
const loginmatch = async(req,res)=>
{
    let email = req.body.mailId
    const loginmail = await eservice.login(email)
    if(loginmail.length==0)
    {
        res.send({
            code:400,
            message :"Email not found"})  
}
else{
    const hashpassword = loginmail[0].password
    const Passwordmatch = await bcyrpt.compare(req.body.password, hashpassword)
    const token = await jwt.sign({email},process.env.Jwtsecretkey,{expiresIn:"30minutes"})
    if(Passwordmatch)
    {
        res.send(
            {
                code:200,
                message: "Login success",
                Token : token
            }
        )
    }
    else{
        res.send({
            code:400,
            message :"Incorrect password"
        })
    }
}}
//update hashed password in database

const updatepassword = async(req,res)=>
{ try{
    const salt = await bcyrpt.genSalt(10);
        const newHashedPassword = await bcyrpt.hash(req.body.password, salt);
        req.body.password= newHashedPassword
        const updateresult = await eservice.update(req.body)
        if (updateresult) {
            return res.send({
                code: 200,
                message: "Password updated successfully"
            });
        } else {
            return res.status(500).send({
                code: 500,
                message: "Failed to update password"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            code: 500,
            message: "Something went wrong"
        });
}}

//update all emp details
const updatemany = async(req,res)=>
{
    const updat = await eservice.updateall(req.body)
    res.send(updat)
}




module.exports=
{
    save, loginmatch, updatepassword, updatemany
}