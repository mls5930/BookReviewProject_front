const express= require("express");
const router = express.Router()
const path = require('path');
const a = path.join(__dirname,`../views/main/main.html`)

router.get('/' , (req,res) => {
    console.log(a);
    
    res.sendFile(a)
})
// const HOST =

// router.get('/login/page', async (req, res) => {
//     const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
//     const redirectURL = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
//     res.redirect(redirectURL);
//   });

module.exports= router