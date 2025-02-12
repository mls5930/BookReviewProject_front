const express = require("express");
const { getList,getSearchBook,
        getCommunity, getBookMark
      } = require('../controller/nav.controller');

const { getUserInfo, getUserPreview, 
        getUserModify
      } = require('../controller/user.controller');


const { getAudioList, getAudioView, 
        getAudioWrite,
      } = require('../controller/audio.controller');


const { getBookReview,getReviewWrite, 
        getReviewList, getReviewDetail,
        getReviewModify, 
      } = require('../controller/review.controller');


const router = express.Router();
const path = require("path");
const mainHtml = path.join(__dirname, `../views/main/`);
const viewHtml = path.join(__dirname, `../views/view/`);
require("dotenv").config();
const { bookData, bookData2 } = require("../public/js/main");
const { attachAuthToken, authMe } = require("../middleware/middleware");
const cookieParser = require("cookie-parser");
const { default: axios } = require("axios");

//메인 페이지
router.get('/' , getList);

const HOST = "https://kauth.kakao.com";
const REST_API_KEY = process.env.API_KEY;

router.get("/login/page", async (req, res) => {
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  const redirectURL = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  res.redirect(redirectURL);
});

//내 북마크
router.get("/mybookmark", getUserInfo);

//내 감상문
router.get("/myreview", getUserPreview);

//내 정보
router.get("/usermodify", getUserModify);

// 오디오
router.get("/audiolist", getAudioList);

router.get("/audioview", getAudioView);

router.get("/audiowrite", getAudioWrite);


//검색창에 책 검색
router.get('/booklist', getSearchBook);

//책 리뷰
router.get('/bookview/:isbn13', getBookReview);

//책 리뷰에 대한 감상문 
router.get('/reviewWrite/:isbn13', getReviewWrite);


//리뷰 감상문 전체 목록
router.get('/reviewlist', getReviewList)


router.get("/reviewdetail/:review_id", getReviewDetail);

//내 리뷰 수정
router.get("/reviewmodify/:review_id", getReviewModify);

router.get("/booksearch", (req, res) => {
  const listBook = bookData.map((book) => {
    return {
      cover: book.cover,
      title: book.title.split("-")[0],
      author: book.author.split(",")[0],
    };
  });
  res.render(viewHtml + "bookList.html", { listBook });
});

router.get("/community", getCommunity);

router.get("/bookmark", authMe, getBookMark);

module.exports = router;

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
