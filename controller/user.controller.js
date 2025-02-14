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
        mybookmark,
        user: req.user
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPreview = async (req, res) => {
    console.log(req.user);
    
    res.render(mainHtml + `myreview.html`, {
      // mybookData,
      user: req.user
    });

  }

  const getUserModify = async (req, res) => {
    const nickname = req.user.nickname;
    if (!nickname) return res.status(401).redirect("http://localhost:3005/");
    
    try {
      const userInfo = (await axios.post(`${BACK_URL}/user/userInfo`,{
        nickname: nickname
        })).data
        
      const bookDataOne = (await axios.get(`${BACK_URL}/review/list?nickname=${nickname}`)).data;
      const count = {
        count: bookDataOne[0].reviewCount
       }

       
      const mybookmark = (await axios.get(`${BACK_URL}/bookmark/mybookmark?nickname=${nickname}`)).data;
       console.log(mybookmark);
       
      console.log("userInfo", userInfo);
      
      res.render(mainHtml+ "usermodify.html", {
        user : req.user,
        userInfo : userInfo,
        reviewCount : count,
        mybookmark : mybookmark
      });
    } catch (error) {
      console.log(error);      
    }
  }

  module.exports = {getUserInfo, getUserPreview, getUserModify};

