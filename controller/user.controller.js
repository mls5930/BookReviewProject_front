const axios = require('axios');
const path = require('path');
const mainHtml = path.join(__dirname,`../views/main/`)
const viewHtml = path.join(__dirname,`../views/view/`)
require('dotenv').config();
const BACK_HOST = process.env.BACK_HOST;
const BACK_HOST_PORT = process.env.BACK_HOST_PORT;
const BACK_URL = `http://${BACK_HOST}:${BACK_HOST_PORT}`;

const getUserInfo = async (req, res) => {
    const bookDatalist = await axios.get(`${BACK_URL}/view?QueryType=ItemNewSpecial&SearchTarget=Book&amout=10`);
    mybookData = bookDatalist.data;
    const mybookData = bookData.map((book) => {
      return {
        title: book.title.split("-")[0],
        cover: book.cover,
        author: book.author.split(",")[0],
        isbn13 : book.isbn13,
      };
    });
    // console.log(mybookData);
    res.render(mainHtml + `mypage.html`, {
      mybookData,
    });
  };

  const getUserPreview = async (req, res) => {
    // const bookData = await axios.get('http://localhost3000/bookList',{search:"비트코인"})
    const mybookData = bookData.map((book) => {
      return {
        title: book.title.split("-")[0],
        cover: book.cover,
        author: book.author.split(",")[0],
        pubDate: book.pubDate,
      };
    });
    res.render(mainHtml + `myreview.html`, {
      mybookData,
    });
  }

  const getUserModify = async (req, res) => {
    // const bookdata = bookData.splice(0,1)
    const isbn13 = req.params.isbn13;
    const [bookDataOne] = (await axios.get(`${BACK_URL}/list?itemId=${isbn13}`)).data
    // console.log(bookdata);

    res.render("main/userModify.html", {
      bookdata : bookDataOne,
    });
  }

  module.exports = {getUserInfo, getUserPreview, getUserModify};

