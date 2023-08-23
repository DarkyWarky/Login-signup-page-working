const jwt = require('jsonwebtoken')
const config =require('../config/config')

const verify_token = async(req,res,next)=>{
    const token = req.body.token || req.query.token ||req.headers['authorization']
    if (!token) {   
        res.status(200).send({success:true,msg:"token is required"})
    }
    try {
        const decode = jwt.verify(token,config.secret_jwt)
        req.user = decode

    } catch (error) {
        res.status(400).send({success:false,msg:"invalid token"})
    }
    return next()
}

module.exports = verify_token