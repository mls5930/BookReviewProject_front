const express = require("express");
const {
  getList,
  getSearchBook,
  getCommunity,
  getBookMark,
} = require("../controller/nav.controller");

const {
  getUserInfo,
  getUserPreview,
  getUserModify,
} = require("../controller/user.controller");

const {
  getAudioList,
  getAudioView,
  getAudioWrite,
} = require("../controller/audio.controller");

const {
  getBookReview,
  getReviewWrite,
  getReviewList,
  getReviewDetail,
  getReviewModify,
} = require("../controller/review.controller");

const router = express.Router();
const path = require("path");
const viewHtml = path.join(__dirname, `../views/view/`);
require("dotenv").config();
const { bookData } = require("../public/js/main");
const {  authMe } = require("../middleware/middleware");

const HOST = "https://kauth.kakao.com";
const REST_API_KEY = process.env.API_KEY;

router.get("/login/page", async (req, res) => {
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  const redirectURL = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  res.redirect(redirectURL);
});

//메인 페이지
router.get('/' , authMe, getList);

//내 북마크
router.get("/mybookmark", authMe, getUserInfo);

//내 감상문
router.get("/myreview", authMe, getUserPreview);

//내 정보
router.get("/usermodify",authMe, getUserModify);

// 오디오
router.get("/audiolist", authMe, getAudioList);

router.get("/audioview/:isbn13", authMe, getAudioView);

router.get("/audiowrite", authMe ,getAudioWrite);

// 책
router.get("/booklist", authMe, (req, res) => {
  const listBook = bookData.map((book) => {
    return {
      isbn13: book.isbn13,
      cover: book.cover,
      title: book.title.split("-")[0],
      author: book.author.split(",")[0],
    };
  });
  res.render(viewHtml + "bookList.html", { listBook, user:req.user });
});

// 책 검색
router.get("/booksearch", authMe, getSearchBook);

//책 리뷰
router.get("/bookview/:isbn13", authMe, getBookReview);

//책 리뷰에 대한 감상문
router.get("/reviewWrite/:isbn13", authMe, getReviewWrite);

//리뷰 감상문 전체 목록
router.get("/reviewlist", authMe, getReviewList);

router.get("/reviewdetail/:review_id", authMe, getReviewDetail);

//내 리뷰 수정
router.get("/reviewmodify/:review_id", authMe, getReviewModify);

router.get("/community", authMe, getCommunity);

router.get("/bookmark", authMe, getBookMark);


module.exports = router;
