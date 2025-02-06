const express= require("express");
const router = express.Router()
const path = require('path');
const mainHtml = path.join(__dirname,`../views/main/`)
require('dotenv').config();
const {bookData,bookData2} = require("../public/js/main")
router.get('/' , (req,res) => {
    console.log(mainHtml);
    res.render(mainHtml+`main.html` ,{
        bookData,
        bookData2
    })
})
const HOST = 'https://kauth.kakao.com'
const REST_API_KEY = process.env.API_KEY

// router.get('/login/page', async (req, res) => {
//     const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
//     const redirectURL = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
//     res.redirect(redirectURL);
//   });
router.get('/mypage', async (req, res) => {
    const mybookData = bookData.map( (book) => {
        return{
            title: book.title.split("-")[0],
            cover: book.cover,
            author: book.author.split("(")[0]
        };
    });
    // if (titles)
    console.log(mybookData);
    res.render(mainHtml+`mypage.html`,{
        mybookData
    })
})

router.get('/myreview', async (req, res) => {
    
    res.render(mainHtml+`myreview.html`,{
        bookData
    })
})
module.exports= router

