const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    let data = {
        cssPath: '/public/css/style.css',
        script: '/public/javascript/script.js'
    };
    res.render('login',data);
});

router.get('/', (req, res) => {
    res.render('about')
})

router.get("/signup",(req,res)=>{
    let data = {
        cssPath: '/public/css/Login-page.css'
    };
    res.render('signup',data)
})

module.exports=router