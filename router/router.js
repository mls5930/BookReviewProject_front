const express= require("express");
const router = express.Router()
const path = require('path');
const a = path.join(__dirname,`../views/main/main.html`)
require('dotenv').config();

router.get('/' , (req,res) => {
    console.log(a);
    
    res.sendFile(a)
})
const HOST = 'https://kauth.kakao.com'
const REST_API_KEY = process.env.API_KEY

router.get('/login/page', async (req, res) => {
    const REDIRECT_URI = "http://localhost:3005/oauth/kakao";
    const redirectURL = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    res.redirect(redirectURL);
  });

module.exports= router

router.get("/oauth/kakao", async (req,res) => {
    const { code } = req.qurey
    
})