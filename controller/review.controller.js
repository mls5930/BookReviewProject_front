const axios = require('axios');
const path = require('path');
const mainHtml = path.join(__dirname,`../views/main/`)
const viewHtml = path.join(__dirname,`../views/view/`)
require('dotenv').config();
const BACK_HOST = process.env.BACK_HOST;
const BACK_HOST_PORT = process.env.BACK_HOST_PORT;
const BACK_URL = `http://${BACK_HOST}:${BACK_HOST_PORT}`;

const getBookReview = async (req, res) => {
    const isbn13 = req.params.isbn13;
    const [bookDataOne] = (await axios.get(`${BACK_URL}/list?itemId=${isbn13}`)).data
    const reviewList = (await axios.get(`${BACK_URL}/review/ReivewAll?isbn13=${isbn13}`)).data
    res.render(viewHtml +'bookView.html', {bookData: bookDataOne , ReviewData : reviewList} );
}

const getReviewWrite = async (req, res) => {
    const isbn13 = req.params.isbn13;
    const [bookDataOne] = (await axios.get(`${BACK_URL}/list?itemId=${isbn13}`)).data
    res.render(viewHtml +'reviewWrite.html', {bookData:bookDataOne});
}

const getReviewList = async (req, res) =>{
    //리뷰 검색
    const bookDataView = await axios.get(`${BACK_URL}/search?query=비트코인&SearchTarget=Book&amout=20`);
    bookDataViews = bookDataView.data;

    const listBook = bookDataViews.map( (book) => {
        return{
            title: book.title.split("-")[0],
            cover: book.cover,
            author: book.author.split(",")[0],
            isbn13 : book.isbn13
        };
    });
    res.render(viewHtml +'reviewList.html', {listBook} );
}

const getReviewDetail = async (req, res) => {
    const isbn13 = req.params.isbn13;
    const [bookDataOne] = (await axios.get(`${BACK_URL}/list?itemId=${isbn13}`)).data
    res.render(viewHtml + "reviewDetail.html", { bookData: bookData[0] });
};


const getReviewModify = async (req, res) => {
//const review_id = req.params.review_id;
const review_id = req.params.review_id;
const {isbn13} = req.query;
const [bookDataOne] = (await axios.get(`${BACK_URL}/list?itemId=${isbn13}`)).data
  res.render(viewHtml + "reviewModify.html", { bookData: bookDataOne });
}

module.exports = {getBookReview, getReviewWrite, getReviewList, getReviewDetail, getReviewModify};
