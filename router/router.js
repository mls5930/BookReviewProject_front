const express= require("express");
const router = express.Router()
const path = require('path');
const mainHtml = path.join(__dirname,`../views/main/`)
require('dotenv').config();
const {bookData,bookData2} = require("../public/js/main")
router.get('/' , (req,res) => {
    const mybookData = bookData.map( (book) => {
        return{
            title: book.title.split("-")[0],
            cover: book.cover,
            author: book.author.split(",")[0]
        };
    });
    res.render(mainHtml+`main.html` ,{
        mybookData,
        // bookData
    })
})
const HOST = 'https://kauth.kakao.com'
const REST_API_KEY = process.env.API_KEY

router.get('/login/page', async (req, res) => {
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
    const redirectURL = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    res.redirect(redirectURL);
  });
router.get('/mypage', async (req, res) => {
    const mybookData = bookData.map( (book) => {
        return{
            title: book.title.split("-")[0],
            cover: book.cover,
            author: book.author.split(",")[0]
        };
    });
    // if (titles)
    console.log(mybookData);
    res.render(mainHtml+`mypage.html`,{
        mybookData
    })
})

router.get('/myreview', async (req, res) => {
    // const bookData = await axios.get('http://localhost3000/bookList',{search:"비트코인"})
    const mybookData = bookData.map( (book) => {
        return{
            title: book.title.split("-")[0],
            cover: book.cover,
            author: book.author.split(",")[0]
        };
    });
    res.render(mainHtml+`myreview.html`,{
        mybookData
    })
})

router.get('/usermodify' , async (req, res) => {
    res.render('main/userModify.html' ,{
        bookData
    })
})
module.exports= router


/* axios.[HTTP메서드]([URL], [보낼데이터], [그외설정])
    const response = await axios.post('/user/login', {
        user_id: user_id.value,
        user_pw: user_pw.value
    }, {
        headers: {
            "Content-Type" : "application/json"
        }
    })
    console.log(response.data);
    if(response.data.success) window.location.href = response.data.redirect
*/