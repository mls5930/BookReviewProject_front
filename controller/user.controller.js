const axios = require('axios');
const path = require('path');
const mainHtml = path.join(__dirname,`../views/main/`)
const viewHtml = path.join(__dirname,`../views/view/`)
require('dotenv').config();
const BACK_HOST = process.env.BACK_HOST;
const BACK_HOST_PORT = process.env.BACK_HOST_PORT;
const BACK_URL = `http://${BACK_HOST}:${BACK_HOST_PORT}`;

const getUserInfo = async (req, res) => {
    try {
      // 나중에 북마크 데이터 가져올거임 myBookMarkData
      const mybookmark = await axios.get(`${BACK_URL}/review/list?nickname=${req.user.nickname}`, {
        nickname: req.user.nickname
      });
      console.log(myReviewData);
      res.render(mainHtml + `mypage.html`, {
        myReviewData,
        user: req.user
      });
    } catch (error) {
      console.log(error);
      throw new Error("에러임")
    }
  };

  const getUserPreview = async (req, res) => {
    try {
      const bookData = await axios.get('http://localhost3000/bookList',{search:"비트코인"})
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
    } catch (error) {
      console.log(error);
      throw new Error("에러 발생");
    }
  }

  const getUserModify = async (req, res) => {
    try {
      const [userInfo] = await axios.get(`${BACK_URL}/myInfo`, {
        data: {
          nickname: req.user.nickname
        }
      }).data
      console.log("userInfo", userInfo);
      
      res.render(mainHtml+ "usermodify.html", {
        userInfo,
      });
    } catch (error) {
      console.log(error);
      throw new Error("에러 발생");
      
    }
  }

  module.exports = {getUserInfo, getUserPreview, getUserModify};

