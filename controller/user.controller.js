const axios = require("axios");
const path = require("path");
const mainHtml = path.join(__dirname, `../views/main/`);
const viewHtml = path.join(__dirname, `../views/view/`);
require("dotenv").config();
const BACK_HOST = process.env.BACK_HOST;
const BACK_HOST_PORT = process.env.BACK_HOST_PORT;
const BACK_URL = `http://${BACK_HOST}:${BACK_HOST_PORT}`;

const getUserInfo = async (req, res) => {
    const nickname = req.user.nickname;
    try {
      // 나중에 북마크 데이터 가져올거임 myBookMarkData
      const mybookmark = (await axios.get(`${BACK_URL}/bookmark/mybookmark?nickname=${nickname}`)).data;
      const bookDataOne = (await axios.get(`${BACK_URL}/review/list?nickname=${nickname}`)).data;
      const bookMarkList = (await axios.get(`${BACK_URL}/bookmark/bookmarklist?nickname=${nickname}`)).data;
      const count = {
        count: (Array.isArray(bookDataOne) && bookDataOne.length > 0) 
        ? bookDataOne[0]?.reviewCount ?? 0 : 0
      }
    res.render(mainHtml + `mybookmark.html`, {
      mybookmark: mybookmark,
      user: req.user,
      reviewCount: count,
      mybookData: bookMarkList,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserPreview = async (req, res) => {
  const nickname = req.user.nickname;

  try {
    const bookData = (
      await axios.get(`${BACK_URL}/review/list?nickname=${nickname}`)
    ).data;

    const userInfo = (
      await axios.post(`${BACK_URL}/user/userInfo`, {
        nickname: nickname, //req.user.nickname
      })
    ).data;

    const count = {
      count: (Array.isArray(bookData) && bookData.length > 0) 
        ? bookData[0]?.reviewCount ?? 0 : 0
    }

    const reviewData = bookData.map((one) => {
      return {
        ...one,
        createdAt: one.createdAt.split("T")[0],  
        updatedAt: one.updatedAt.split("T")[0], 
      };
    });
    
    const mybookmark = (await axios.get(`${BACK_URL}/bookmark/mybookmark?nickname=${nickname}`)).data;
    res.render(mainHtml + `myreview.html`, {
      userInfo : userInfo,
      myReviewData : reviewData.length ? reviewData : false,
      reviewCount : count,
      mybookmark : mybookmark,
      user: req.user
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserModify = async (req, res) => {
  const nickname = req.user.nickname;
  if (!nickname) return res.status(401).redirect("http://localhost:3005/");

  try {
    const userInfo = (await axios.post(`${BACK_URL}/user/userInfo`,{
      nickname: nickname
      })).data
    
    const bookDataOne = (await axios.get(`${BACK_URL}/review/list?nickname=${nickname}`)).data;
    console.log(bookDataOne);
    const count = {
      count: (Array.isArray(bookDataOne) && bookDataOne.length > 0) 
        ? bookDataOne[0]?.reviewCount ?? 0 : 0
      //count: bookDataOne[0].reviewCount?.reviewCount ?? 0
     }
    const mybookmark = (await axios.get(`${BACK_URL}/bookmark/mybookmark?nickname=${nickname}`)).data;
   
    res.render(mainHtml+ "usermodify.html", {
      user : req.user,
      userInfo : userInfo,
      reviewCount : count,
      mybookmark : mybookmark
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserInfo, getUserPreview, getUserModify };
