const axios = require("axios");
const path = require("path");

const viewHtml = path.join(__dirname, `../views/view/`);
require("dotenv").config();
const BACK_HOST = process.env.BACK_HOST;
const BACK_HOST_PORT = process.env.BACK_HOST_PORT;
const BACK_URL = `http://${BACK_HOST}:${BACK_HOST_PORT}`;

const getBookReview = async (req, res) => {
  const isbn13 = req.params.isbn13;
  const [bookDataOne] = (await axios.get(`${BACK_URL}/list?itemId=${isbn13}`))
    .data;
  const reviewList = (
    await axios.get(`${BACK_URL}/review/ReviewAll?isbn13=${isbn13}`)
  ).data;
   const reviewupdata = reviewList.map((date) => {
      return {
        review_id : date.review_id,
        isbn13 : date.isbn13,
        cover: date.cover,
        rating: date.rating,
        context: date.context,
        uuid: date.uuid,
        createdAt: date.createdAt.split("T")[0],
        updatedAt:  date.updatedAt.split("T")[0],
        User: date.User
      }
   
   })
  res.render(viewHtml + "bookView.html", {
    bookData: bookDataOne,
    ReviewData: reviewupdata,
  });
};

const getReviewWrite = async (req, res) => {
  const user = req.user;
  const isbn13 = req.params.isbn13;
  const [bookDataOne] = (await axios.get(`${BACK_URL}/list?itemId=${isbn13}`)).data
  res.render(viewHtml +'reviewWrite.html', {bookData:bookDataOne ,user : user});
};

const getReviewList = async (req, res) => {
  //감상문 전체 검색
  const bookDataView = await axios.get(`${BACK_URL}/review`);
  const bookDataViews = bookDataView.data;
  res.render(viewHtml +'reviewList.html', {listBook : bookDataViews} );
};

const getReviewDetail = async (req, res) => {
  const user = req.user;
  const {nickname} = req.query;
  const review_id = req.params.review_id;
  const [bookDataOne] = (await axios.get(`${BACK_URL}/review/ReviewOne/${review_id}?nickname=${nickname}`)).data;
  const CommentList = (await axios.get(`${BACK_URL}/comment/list?review_id=${review_id}`)).data;
  //console.log("CommentList", CommentList);
  // const reviewupdata = reviewList.map((date) => {
  //   return {
  //     review_id : date.review_id,
  //     isbn13 : date.isbn13,
  //     cover: date.cover,
  //     rating: date.rating,
  //     context: date.context,
  //     uuid: date.uuid,
  //     createdAt: date.createdAt.split("T")[0],
  //     updatedAt:  date.updatedAt.split("T")[0],
  //     User: date.User
  //   }
 
//  })
  
  res.status(201).render(viewHtml + "reviewDetail.html", { bookData: bookDataOne ,
      CommentList:CommentList, user:user});
};

// 감상문 수정 페이지 요청
const getReviewModify = async (req, res) => {
    //const review_id = req.params.review_id;
    const review_id = req.params.review_id;
    const {isbn13} = req.query;
    const [bookDataOne] = (await axios.get(`${BACK_URL}/list?itemId=${isbn13}`)).data;
    res.render(viewHtml + "reviewModify.html", { bookData: bookDataOne });
};

const deleteReview = async (req, res) => {
  const review_id = req.params.review_id;
  const { nickname } = req.query;

  try {
    const response = await axios.delete(`${BACK_URL}/review/${review_id}`, {
      data: { nickname },
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBookReview,
  getReviewWrite,
  getReviewList,
  getReviewDetail,
  getReviewModify,
  deleteReview,
};
