const express= require("express");
const router = express.Router()
const path = require('path');
const mainHtml = path.join(__dirname,`../views/main/`)
const viewHtml = path.join(__dirname,`../views/view/`)
require('dotenv').config();
const {bookData,bookData2} = require("../public/js/main")
const {attachAuthToken, authMe} = require('../middleware/middleware')
const cookieParser = require('cookie-parser');
const { default: axios } = require("axios");



router.get('/' , async (req,res) => {
    // console.log(req.user);
    const user = req.user
    const mybookData = bookData.map( (book) => {
        return{
            title: book.title.split("-")[0],
            cover: book.cover,
            author: book.author.split(",")[0],
            customerReviewRank: book.customerReviewRank
        };
    });
    res.render(mainHtml+`main.html` ,{
        mybookData,
        user
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
            author: book.author.split(",")[0],
            
        };
    });
    // console.log(mybookData);
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
            author: book.author.split(",")[0],
            pubDate: book.pubDate
        };
    });
    res.render(mainHtml+`myreview.html`,{
        mybookData
    })
})

router.get('/usermodify' , (req, res) => {
    // const bookdata = bookData.splice(0,1)
    const bookdata =bookData[0]
    // console.log(bookdata);
    
    res.render('main/userModify.html' ,{
        bookdata
    })
})

// 책 리스트 및 상세페이지에 관한 라우터 

router.get('/audiobook', (req, res) => {
    const listBook = bookData.map( (book) => {
        return{
            cover: book.cover,
            title: book.title.split("-")[0],
            author: book.author.split(",")[0]
        };
    });
    res.render(viewHtml +'audioList.html', {listBook} );
    })


router.get('/audioview', (req, res) => {
    res.render(viewHtml +'audioBookView.html', {bookData:bookData[0]}  );
})

router.get('/audiowrite', (req, res) => {
    res.render(viewHtml +'audioWrite.html', {bookData:bookData[0]}  );
})

router.get('/booklist', (req, res) => {
    const listBook = bookData.map( (book) => {
        return{
            cover: book.cover,
            title: book.title.split("-")[0],
            author: book.author.split(",")[0]
        };
    });
    res.render(viewHtml +'bookList.html', {listBook} );
})

router.get('/bookview', (req, res) => {
    res.render(viewHtml +'bookView.html', {bookData:bookData[0]} );
})

router.get('/reviewwrite', (req, res) => {
    res.render(viewHtml +'reviewWrite.html', {bookData:bookData[0]} );
})

router.get('/reviewlist', (req, res) => {
    const listBook = bookData.map( (book) => {
        return{
            cover: book.cover,
            title: book.title.split("-")[0],
            author: book.author.split(",")[0]
        };
    });
    res.render(viewHtml +'reviewList.html', {listBook} );
})

router.get('/review', (req, res) => {
    // console.log(bookData[0]);
    res.render(viewHtml +'reviewDetail.html', {bookData:bookData[0]} );
})

router.get('/community', (req, res) => {
    res.render(viewHtml +'community.html');
})

router.get('/bookmark',authMe, async (req , res) => {
    req.user.nickname
    try {
        const bookmark = await axios.post('http://localhost:3000/user/register',{
            nickname: nickname
        })
     res.status(202).render("main/mypage.html",{
        bookmark
    })

    } catch (error) {
        return res.status(401).send()
    }

})
module.exports= router






// router.get('/test' ,(req,res) => {
//     const mybookData = bookData.map( (book) => {
//         return{
//             title: book.title.split("-")[0],
//             cover: book.cover,
//             author: book.author.split(",")[0],
//             customerReviewRank: book.customerReviewRank
//         };
//     });
//     res.render(mainHtml+`test.html` ,{
//         mybookData,
        
//     })
// })

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


// const items = [];
// for (let i = 1; i <= bookData.length; i++) {
//   items.push(bookData[i]);
// }

// app.get('/slideTest', (req, res) => {
//   res.render('main/slideTest.html', { items });
// })
