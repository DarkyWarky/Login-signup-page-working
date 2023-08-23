const User = require("../models/usermodel")
const bcryptjs= require('bcryptjs')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const random_string = require("randomstring")

const sendresetmail = async(name,email,token)=>{
    try {
        const Transporter = nodemailer.createTransport({
            host:'smtp.ethereal.email',
            port:587,
            secure:false,
            requireTLS: true,
            auth:{
                user:config.UserEmail,
                pass:config.UserPassword
            }
        })
        const mailOptions ={
            from:config.UserEmail,
            to:email,
            subject:"For Reset password",
            html:'<p> Hello '+ name+',copy the link and <a href ="http://localhost:3000/api/reset_password?token='+token+'">reset the password</a>'
        }
        Transporter.sendMail(mailOptions,function(error,info){
            if (error) {
                console.log(error)
            }
            else console.log("email has been sent",info.response)
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const securePassword= async(password)=>{
    try {
        const passwordhash =await bcryptjs.hash(password,10);
        return passwordhash;
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const create_token = async(id)=>{
    try {
        const token = await jwt.sign({_id:id},config.secret_jwt)
        return token
    } catch (error) {
        res.status(400).send(error.message)
    }
}


// Register Method
const register_user =async(req,res)=>{
    try {
        const spassword = await securePassword(req.body.password)
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:spassword
        })

        const userData = await User.findOne({email:req.body.email})
        if (userData) {
            res.status(200).send({success:false,msg:"this email already exists"})
        } else {
            const user_data = await user.save();
            res.status(200).send({success:true,data:user_data})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// login password Method
const login_user =async(req,res)=>{
    try {
        const email = req.body.email
        const password =req.body.password
        const user_data = await User.findOne({
            email:email
        })
        if (user_data) {
            const password_match = await bcryptjs.compare(password,user_data.password)
            if (password_match) {
                const token_data =await create_token(user_data.id)
                const user_result ={
                    _id:user_data.id,
                    name:user_data.name,
                    password:user_data.password,
                    token_data:token_data
                }
                const response ={
                    success:true,
                    msg:"User details",
                    data:user_result
                }
                res.status(200).send(response)
            }
            else{
                res.status(200).send({success:false,msg:"login details are incorrect"})
            }
        } else {
            res.status(200).send({success:false,msg:"login details are incorrect"})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }

}
// Update Password Method

const update_password = async(req,res)=>{
    try {
        const user_id = req.body.user_id
        const password = req.body.password
        const data =await User.findOne({_id:user_id})
        if (data) {
            const new_password = await securePassword(password)
            const user_data = await User.findByIdAndUpdate({_id:user_id},{$set:{
                password: new_password
            }})
            res.status(200).send({success:true,msg:"User password Updated"})
        } else {
            res.status(200).send({success:false,msg:"User id not found"})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Forget Password

const forget_password = async(req,res)=>{
    try {
        const email = req.body.email
        const user_data = await User.findOne({email:email})
        if (user_data) {
            const ran_string = random_string.generate()
            const data = await User.updateOne({email:email},{$set:{token: ran_string}})
            sendresetmail(user_data.name,user_data.email,ran_string)
            res.status(200).send({success:true,msg:"Please check your inbox of email and reset your password"})
        } 
        else {
            res.status(200).send({success:true,msg:"Email doesn't exist"})
        }


    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports ={
    register_user,login_user,update_password,forget_password
}